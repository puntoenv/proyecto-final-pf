import Card from "../../components/Card";

export default function Detail({ data }) {
<<<<<<< HEAD

  return (
    <>
      {
        <Card
          nombre={data.name}
          tamaño={data.size}
          imagen={data.image}
          edad={data.age}
          genero={data.gender}
          tipo={data.type}
          locacion={data.location}
          
        />
      }
      
    </>
  );
=======
  return <>{<Card tamaño={data.size} />}</>;
>>>>>>> 39a6c9fa20be4a01f7bf718d3afa0793e13d87e2
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
