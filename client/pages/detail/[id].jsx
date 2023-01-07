import Card from "../../components/Card";

export default function Detail({ data }) {
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> dda02e1803c1ad8be998eda312e44942d140555d
  return (
    <>
      {
        <Card
<<<<<<< HEAD
          nombre={data.name}
          tamaño={data.size}
=======
          tamaño={data.size}
          id={data._id}
>>>>>>> dda02e1803c1ad8be998eda312e44942d140555d
          imagen={data.image}
          edad={data.age}
          genero={data.gender}
          tipo={data.type}
          locacion={data.location}
<<<<<<< HEAD
          
        />
      }
      
    </>
  );
=======
  return <>{<Card tamaño={data.size} />}</>;
>>>>>>> 39a6c9fa20be4a01f7bf718d3afa0793e13d87e2
=======
          nombre={data.name}
          description={data.description}
        />
      }
    </>
  );
>>>>>>> dda02e1803c1ad8be998eda312e44942d140555d
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
