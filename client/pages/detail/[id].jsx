import Card from "../../components/Card";

export default function Detail({ data }) {
  return (
    <>
      {
        <Card
          tamaño={data.size}
          id={data._id}
          imagen={data.image}
          edad={data.age}
          genero={data.gender}
          tipo={data.type}
          locacion={data.location}
          nombre={data.name}
          description={data.description}
        />
      }
    </>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const data = await (
      await fetch("http://localhost:3001/pets/detail/" + params.id)
    ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
