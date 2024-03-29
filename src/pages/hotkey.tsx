import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HotkeyListOrder from '../components/blocks/hotkeyListOrder';
import HotkeyListCoin from '../components/blocks/hotkeyListCoin';
import HotkeyListToggle from '../components/blocks/hotkeyListToggle';
import { setHotkeyListData } from '../util/setHotkeyData';
import type { OHLType, CHLType } from '../static/localData';

type createButtonHandleType = 'order' | 'coin';

const Hotkey: React.FC = () => {
  const [orderHotkeyList, setOrderHotkeyList] = useState<Array<OHLType>>([]);
  const [coinHotkeyList, setCoinHotkeyList] = useState<Array<CHLType>>([]);

  useEffect(() => {
    chrome.storage.sync.get('hotkey', (data) => {
      setOrderHotkeyList(data.hotkey.orderHotkeyList);
      setCoinHotkeyList(data.hotkey.coinHotkeyList);
    });
  }, []);

  const createButtonHandle = async (type: createButtonHandleType) => {
    if (type === 'order') {
      const newData: OHLType = {
        front: 'none',
        back: 'none',
        command: 'none',
        isActive: false,
      };

      setHotkeyListData({
        type,
        data: newData,
        idx: orderHotkeyList.length,
      }).then((res) => {
        setOrderHotkeyList((orderHotkeyList) => [...orderHotkeyList, newData]);
      });
    } else {
      const newData: CHLType = {
        hotkey: 'none',
        command: 'none',
        isActive: false,
      };

      setHotkeyListData({
        type,
        data: newData,
        idx: coinHotkeyList.length,
      }).then((res) => {
        setCoinHotkeyList((coinHotkeyList) => [...coinHotkeyList, newData]);
      });
    }
  };

  return (
    <main className='hotkey-main min-h-[500px]'>
      <HotkeyListToggle title='주문 관련 단축키 설정' type='order'>
        <li className='flex justify-center items-center px-5 pb-5'>
          <div className='basis-[7%] flex justify-center items-center'></div>
          <div className='basis-[38%] flex justify-center items-center text-sm font-semibold'>
            단축키
          </div>
          <div className='basis-[45%] flex justify-center items-center text-sm font-semibold'>
            명령
          </div>
          <div className='basis-[10%] flex justify-center items-center text-sm font-semibold'>
            On/Off
          </div>
        </li>
        <li className='border-b-[10px] border-borderColor'>
          <ul className='default-list'>
            {orderHotkeyList.map((el, idx) => (
              <HotkeyListOrder
                key={uuidv4()}
                isFixed={idx < 4 ? true : false}
                idx={idx}
                orderHotkeyData={el}
                setOrderHotkeyList={setOrderHotkeyList}
              />
            ))}
          </ul>
          <ul className='added-list'></ul>
          <div
            className='add-button border-t-[1px] border-borderColor 
          w-full h-[100px] flex justify-center items-center'
          >
            <button
              className='bg-mainColor text-white w-[200px] h-[50px] 
            text-[14px] font-semibold rounded-xl hover:bg-mainUpColor'
              onClick={() => createButtonHandle('order')}
            >
              + 단축키 추가하기
            </button>
          </div>
        </li>
      </HotkeyListToggle>
      <HotkeyListToggle title='종목 바로가기 단축키 설정' type='coin'>
        <li className='flex justify-center items-center px-5 pb-5'>
          <div className='basis-[7%] flex justify-center items-center'></div>
          <div className='basis-[38%] flex justify-center items-center text-sm font-semibold'>
            단축키
          </div>
          <div className='basis-[45%] flex justify-center items-center text-sm font-semibold'>
            명령
          </div>
          <div className='basis-[10%] flex justify-center items-center text-sm font-semibold'>
            On/Off
          </div>
        </li>
        <li>
          <ul className='default-list'>
            {coinHotkeyList.map((el, idx) => (
              <HotkeyListCoin
                key={uuidv4()}
                isFixed={idx < 4 ? true : false}
                idx={idx}
                coinHotkeyData={el}
                setCoinHotkeyList={setCoinHotkeyList}
              />
            ))}
          </ul>
          <ul className='added-list'></ul>
          <div
            className='add-button border-t-[1px] border-borderColor 
          w-full h-[100px] flex justify-center items-center'
          >
            <button
              className='bg-mainColor text-white w-[200px] h-[50px] 
            text-[14px] font-semibold rounded-xl hover:bg-mainUpColor'
              onClick={() => createButtonHandle('coin')}
            >
              + 단축키 추가하기
            </button>
          </div>
        </li>
      </HotkeyListToggle>
    </main>
  );
};

export default Hotkey;
