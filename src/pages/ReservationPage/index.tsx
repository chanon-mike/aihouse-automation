import { BsGithub } from 'react-icons/bs';
import Scheduler from '../../components/calendar/DatePicker'
import FormField from '../../components/form/FormField';
import testForm from '../../scripts/testForm.json';
import prodForm from '../../scripts/prodForm.json';
import PageLayout from '../../components/common/PageLayout';

const Reservation = () => {
  return (
    <PageLayout>
      <div className="w-full h-full flex flex-col justify-center items-center text-dark mt-28">
        <div className="text-center">
          <h1 className="text-5xl font-semibold">AI-House HUB-4</h1>
          <h1 className="text-xl font-bold">夕食取り置き予約 (英語の部分は頼んだ)</h1>
        </div>
        <p className="text-sm max-w-2xl text-clip text-center mt-2">
          夕食取り置きをする日を選択してください。
          <br />
          予約をキャンセルする場合は、予約日を押すと削除できます。
          <br />
          (英語の部分は頼んだ)
        </p>
        <div>
          <Scheduler />
        </div>

        <footer>
          <a className="flex mt-10" href="https://github.com/chanon-mike/aihouse-automation">
            <BsGithub className="text-2xl" />
          </a>
        </footer>
      </div>
    </PageLayout>
  );
};

export default Reservation;
