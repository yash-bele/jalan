import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { BsAlarm, BsTrash, BsArrowLeftCircle } from 'react-icons/bs';
import Head from 'next/head';
import Link from 'next/link';

const Alarm = () => {
  const [date, setDate] = useState({
    format1: '00:00:00',
    format2: 'h:mm a',
    format3: 'MMMM Do YYYY',
  });
  const [input, setInput] = useState({ hr: '', min: '', opt: 'am' });
  const [list, setList] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate({
        format1: moment().format('h:mm:ss'),
        format2: moment().format('h:mm a'),
        format3: moment().format('MMMM Do YYYY'),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleChange = (prop) => (e) => {
    setInput({ ...input, [prop]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({ hr: '', min: '', opt: 'am' });
    if (input.hr > 12) return alert(`Hour can't be greater than 12hrs`);
    if (input.min > 59) return alert(`Minutes can't be greater than 59mins`);
    setList([...list, input]);
  };

  const handleList = (index) => {
    setList(list.filter((k, l) => l !== index));
  };

  return (
    <>
      <Head>
        <title>Jalan Tech</title>
        <meta name='description' content='Website' />
        <link
          rel='icon'
          href='https://cdn-icons-png.flaticon.com/512/2752/2752499.png'
        />
      </Head>
      <main className='absolute w-full h-full flex justify-center items-start'>
        <Link
          href='/'
          className='absolute top-5 right-5 sm:right-10 flex items-center duration-200 font-semibold text-slate-500 hover:text-slate-700'
        >
          <p className='mr-2 tracking-wide'>Solution1</p>
          <BsArrowLeftCircle className='text-2xl' />
        </Link>
        <section className='mt-20'>
          <div className='text-center mb-10'>
            <h1 className='text-5xl mb-1 text-slate-700'>{date.format1}</h1>
            <p className='text-sm text-slate-500'>{date.format3}</p>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            <div className='flex text-sm font-semibold text-slate-700 mb-5'>
              <input
                required
                type='number'
                placeholder='hr'
                ref={ref}
                value={input.hr}
                onChange={handleChange('hr')}
                className='w-14 outline-none border-2 pl-2 py-1 rounded-md focus:border-slate-400 duration-200 mr-2'
              />
              <input
                required
                type='number'
                placeholder='min'
                value={input.min}
                onChange={handleChange('min')}
                className='w-14 outline-none border-2 pl-2 py-1 rounded-md focus:border-slate-400 duration-200 mr-2'
              />
              <select
                value={input.opt}
                onChange={handleChange('opt')}
                className='w-14 outline-none border-2 pl-1 pb-1 focus:border-slate-400 duration-200 rounded-md'
              >
                <option>am</option>
                <option>pm</option>
              </select>
            </div>
            <button
              type='submit'
              className='bg-slate-700 text-white font-medium tracking-widest px-10 py-1 rounded-md hover:bg-slate-800 duration-200'
            >
              SET
            </button>
          </form>
          <div className='mt-10'>
            {list.map((i, j) => {
              const { hr, min, opt } = i;
              const time = `${hr}:${min} ${opt}`;
              const currTime = moment().format('h:mm a');
              return (
                <div
                  key={j}
                  className={`w-72 mb-2 flex items-center justify-between p-2 rounded-md duration-200 ${
                    time === currTime ? 'bg-red-200' : 'bg-slate-100'
                  }`}
                >
                  <div className='flex items-center'>
                    <BsAlarm className='text-xl mr-2 mb-0.5' />
                    <p className='font-bold text-slate-600'>{time}</p>
                  </div>
                  <div>
                    <BsTrash
                      onClick={() => handleList(j)}
                      className='text-xl mb-0.5 cursor-pointer'
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Alarm;
