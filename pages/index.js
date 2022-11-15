import Head from 'next/head';
import Link from 'next/link';
import { BsClipboard, BsArrowRightCircle } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const code =
    'const shiftArray = (array, p, d) => {\n  return d !== 0 ? array : [...array.splice(p), ...array];\n}\nconsole.log(shiftArray([1, 3, 2, 7, 4, 6], 3, 0));';

  const handleClick = () => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to Clipboard');
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
      <main className='absolute w-full h-full flex items-center justify-center bg-slate-200'>
        <Link
          href='/alarm'
          className='absolute top-5 right-10 flex items-center duration-200 font-semibold text-slate-500 hover:text-slate-700'
        >
          <p className='mr-2 tracking-wide'>Solution2</p>
          <BsArrowRightCircle className='text-2xl' />
        </Link>
        <pre className='p-5 bg-slate-100 rounded-md duration-200 shadow-md hover:shadow-lg relative overflow-x-scroll w-11/12 text-sm sm:text-base sm:w-auto sm:overflow-auto scrollbar scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-md hover:scrollbar-thumb-slate-400'>
          <BsClipboard
            onClick={handleClick}
            className='absolute right-2.5 top-2 cursor-pointer text-lg hidden sm:block'
          />
          <code>const shiftArray = (array, p, d) =&gt; &#123;</code>
          <br />
          <code>
            &nbsp;&nbsp;return d !== 0 ? array : [...array.splice(p), ...array];
          </code>
          <br />
          <code>&#125;</code>
          <br />
          <code>console.log(shiftArray([1, 3, 2, 7, 4, 6], 3, 0));</code>
        </pre>
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme='light'
        />
      </main>
    </>
  );
};

export default Home;
