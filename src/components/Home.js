import Notes from "./Notes";
export default function Home(props) {
  return (
    <>
        {/* this is homepage */}
        <Notes alert={props.alert}/>
    </>
  );
}
