import Head from "next/head";

export default function Layout({ title }) {
  return (
    <>
      <Head>
        <title> {title || "Little Paws"} </title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dibwxnomi/image/upload/v1673130416/WhatsApp_Image_2023-01-07_at_12.58.49_PM-removebg-preview_zlkob6.png"
        />
      </Head>
    </>
  );
}
