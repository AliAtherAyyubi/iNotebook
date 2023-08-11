import Notes from "./Notes";
export default function Home(props) {
  return (
    <>
        <Notes alert={props.alert}/>
    </>
  );
}
