import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {GNB} from '../components/GNB/GNB';
import '../globals.css';
import {pretendardSubset} from '../utils/font';

import Providers from './providers';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${pretendardSubset.className} bg-gray-100`}>
        <Providers>
          <GNB />
          <ToastContainer position="top-center" autoClose={2000} />
          <main className="mx-auto h-screen max-w-screen-desktop pt-14">
            <div className="min-h-screen overflow-y-auto bg-gray-50 px-4 pt-8 tablet:px-6 desktop:px-24">
              <div className="mx-auto max-w-screen-desktop">{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
