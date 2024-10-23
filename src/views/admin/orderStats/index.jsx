import { Box, SimpleGrid, Td, Tr, Text, Input, Flex } from '@chakra-ui/react';
import { Button, Pagination, Select } from 'antd';
import { globalGetFunction } from 'contexts/logic-function/globalFunktion';
import { PaymentStore } from 'contexts/state-management/payment/paymentStore';
import { setConfig } from 'contexts/token';
import React, { useEffect, useState } from 'react';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { order_stats } from 'contexts/api';
import { Option } from 'antd/es/mentions';
import { downloadFile } from 'contexts/logic-function/DownLoadFile';
import { download_file } from 'contexts/api';
import { download_interval } from 'contexts/api';
import { order_stats_seller_and_terminal } from 'contexts/api';

export default function OrderStats() {
  const {
    setPaymentData,
    paymentData,
    setPage,
    totalPage,
    page,
    setTotalPages,
  } = PaymentStore();
  const { t } = useTranslation();
  const role = sessionStorage.getItem('ROLE');
  const [createLoading, setCreateLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mfo, setMfo] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');
  const [intervalData, setIntervalData] = useState(null);
  const [downloadInterval, setDownloadInterval] = useState('');
  const thead = [
    'T/r',
    t('merchant'),
    t('amount'),
    t('filial_code'),
    t('rate'),
    t('createDate'),
    t('paymentDate'),
    t('status'),
  ];

  useEffect(() => {
    setConfig();
    getFunction();
  }, []);

  useEffect(() => {
    globalGetFunction({
      url: `${download_interval}`,
      setData: setIntervalData,
    });
  }, []);

  useEffect(() => {
    globalGetFunction({
      url: `${
        role === 'ROLE_SELLER' || role === 'ROLE_TERMINAL'
          ? order_stats_seller_and_terminal
          : order_stats
      }${
        fullName || mfo || createdAt || paymentDate || status || amount
          ? '?'
          : ''
      }${fullName ? `fullName=${fullName}` : ''}${mfo ? `&mfo=${mfo}` : ''}${
        createdAt ? `&createdAt=${createdAt}` : ''
      }${paymentDate ? `&paymentDate=${paymentDate}` : ''}${
        status ? `&status=${status}` : ''
      }${amount ? `&amount=${amount}` : ''}`,
      setLoading: setCreateLoading,
      setData: setPaymentData,
      setTotalElements: setTotalPages,
      page: page,
    });
  }, [page, fullName, mfo, createdAt, paymentDate, status, amount]);
  const getFunction = () => {
    globalGetFunction({
      url: `${
        role === 'ROLE_SELLER' || role === 'ROLE_TERMINAL'
          ? order_stats_seller_and_terminal
          : order_stats
      }`,
      setLoading: setCreateLoading,
      setData: setPaymentData,
      setTotalElements: setTotalPages,
      page: page,
    });
  };
  const handleDownloadFile = () => {
    downloadFile(`${download_file}?page=${downloadInterval}`);
  };
  console.log(downloadInterval);
  const onChange = (page) => setPage(page - 1);
  const bgGenerator = (status) => {
    if (status === 'WAIT') return ['orange', t('wait')];
    else if (status === 'COMPLETED') return ['green', t('confirmed')];
    else if (status === 'CANCEL') return ['red', t('canceled')];
    else return ['gray', t('unknown')];
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ComplexTable
          name={
            <div>
              {t('paymentStats')} {t('table')}
              <Flex my={5} gap={5}>
                <Select
                  placeholder={t('interval')}
                  onChange={(value) => {
                    setDownloadInterval(value);
                  }}
                  style={{ width: '200px', height: '40px' }}
                >
                  <Option disabled value="">
                    {t('interval')}
                  </Option>
                  {intervalData &&
                    intervalData?.map((item) => (
                      <Option key={item.page} value={item.page}>
                        {item.interval}
                      </Option>
                    ))}
                </Select>
                <Button
                  style={{ height: '40px', width: '130px' }}
                  disabled={!downloadInterval}
                  onClick={handleDownloadFile}
                >
                  {t('downloadFile')}
                </Button>
              </Flex>
              <Flex gap={2} mt={5}>
                {role !== 'ROLE_SELLER' && role !== 'ROLE_TERMINAL' && (
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('fullNameOrder')}
                  />
                )}
                {role !== 'ROLE_TERMINAL' && (
                  <Input
                    type="text"
                    value={mfo}
                    onChange={(e) => setMfo(e.target.value)}
                    placeholder={t('mfoOrder')}
                  />
                )}
                <Input
                  type="date"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  placeholder={t('createdAtOrder')}
                />
                <Input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  placeholder={t('paymentDateOrder')}
                />
                <Select
                  value={status}
                  style={{ width: '100%', height: '40px' }}
                  onChange={(value) => setStatus(value)}
                  placeholder={t('statusOrder')}
                >
                  <Option value="">{t('statusOrder')}</Option>{' '}
                  {/* Default empty value */}
                  <Option value="WAIT">{t('wait')}</Option>
                  <Option value="COMPLETED">{t('completed')}</Option>
                  <Option value="CANCEL">{t('canceled')}</Option>
                </Select>
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t('amountOrder')}
                />
                <Button
                  style={{ height: '40px' }}
                  onClick={() => {
                    setFullName('');
                    setMfo('');
                    setCreatedAt('');
                    setPaymentDate('');
                    setStatus('');
                    setAmount('');
                  }}
                >
                  {t('resetOrder')}{' '}
                </Button>
              </Flex>
            </div>
          }
          thead={thead}
        >
          {createLoading ? (
            <Tr>
              <Td textAlign="center" colSpan={thead.length}>
                {t('loading')}...
              </Td>
            </Tr>
          ) : paymentData && paymentData?.object ? (
            paymentData.object.map((item, i) => (
              <Tr key={i}>
                <Td>{page * 10 + i + 1}</Td>
                <Td>{item.merchant ? item.merchant : '-'}</Td>
                {/* <Td>{item.terminalName ? item.terminalName : "-"}</Td> */}
                <Td>
                  {item.amount
                    ? `${item.amount.toLocaleString('uz-UZ', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : '-'}
                </Td>
                <Td>{item.filial_code ? item.filial_code : '-'}</Td>
                <Td>{item.rate ? item.rate : '-'}</Td>
                <Td>
                  {item.createdAt
                    ? moment(item.createdAt.slice(0, 10)).format('DD.MM.YYYY')
                    : '-'}
                </Td>
                <Td>
                  {item.createdAt
                    ? moment(item.paymentDate.slice(0, 10)).format('DD.MM.YYYY')
                    : '-'}
                </Td>
                <Td alignSelf="flex-start">
                  <Text
                    background={'#ECEFF8'}
                    color={bgGenerator(item.status)[0]}
                    py="10px"
                    fontWeight="700"
                    borderRadius="10px"
                    textAlign={'center'}
                    width={'130px'}
                  >
                    {item?.status ? bgGenerator(item?.status)[1] : ''}
                  </Text>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td textAlign={'center'} colSpan={6}>
                {t('paymentStats')}
                {t('notFound')}
              </Td>
            </Tr>
          )}
        </ComplexTable>
      </SimpleGrid>
      {paymentData && paymentData?.object && (
        <Pagination
          showSizeChanger={false}
          responsive={true}
          defaultCurrent={1}
          total={totalPage}
          onChange={onChange}
        />
      )}
    </Box>
  );
}
