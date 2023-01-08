import { getProviders, signIn } from "next-auth/react";

const signin = ({ providers }) => {
  return (
    <div className="flex justify-center mt-20 space-x-5 ">
      <Image
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt="twitter image"
        className="md:w-44 md:h-80 object-cover md:inline rotate-6 hidden"
      />
      <div className=" ">
        {Object.values(providers).map((provider, index) => (
          <div className="flex flex-col items-center" key={index}>
            <img
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="twitter2"
              className="w-36 object-cover"
            />
            <p className="text-center text-sm italic my-10">
              This app is created for learning purposes
            </p>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="bg-red-400 text-white font-bold p-3 rounded-lg hover:bg-red-600"
            >
              Signin with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default signin;
