import GoogleForm from '@/components/form/GoogleForm';

const Home = () => {
  return (
    <div className="hero text-neutral">
      <div className="hero-content text-center flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold">KEEP MY DINNER REQUEST</h2>
        <h1 className="text-4xl font-bold">夕食取り置き届</h1>

        <p className="text-sm max-w-2xl text-clip text-center mt-2">
          初回のみフォームに情報を入力してください。
          その後、データはデバイスに保存されるため、再度入力する必要はありません！閉じるまでアラートメッセージをお待ちください。
          <br />
          You only need to enter your information in the form for the first time. After that, the
          data will be saved on your device, so the further input is not needed! Please wait until
          alert message appear.
        </p>
        <GoogleForm />
      </div>
    </div>
  );
};

export default Home;
