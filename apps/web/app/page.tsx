import AppJoinRoom from "./_components/AppJoinRoom";
import AppPageTitle from "./_components/AppPageTitle";
import AppCreateRoom from "./_components/AppCreateRoom";

export default function MainPage() {
  return (
    <>
      <AppPageTitle
        title="Scrum Estimation"
        subTitle="A collaborative tool that helps agile teams quickly estimate the effort or complexity of tasks by voting in real time."
      />

      <main className="app-container flex items-start gap-6 pb-16">
        <AppCreateRoom />

        <p className="p-5">or</p>

        <AppJoinRoom />
      </main>
    </>
  );
}
