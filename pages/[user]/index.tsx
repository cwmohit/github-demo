import Link from "next/link";
import { Router, useRouter } from "next/router";
import React from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Profile from "../../components/Profile";

function User({ data, repos = [] }: any) {
  const { public_repos }: { public_repos: number } = data;
  const pagination_length = Math.ceil(public_repos / 10);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { page = 1, user } = router?.query;

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  if (data?.message === "API rate limit exceeded") {
    return (
      <h4 className="text-center">
        Please try again later api rate limit exceeded
      </h4>
    );
  }

  return (
    <div>
      <main>
        <Profile
          name={data?.name}
          bio={data?.bio}
          location={data?.location}
          blog={data?.blog}
          avatar={data?.avatar_url}
          github={data?.html_url}
        />
      </main>
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (
        <div className="container my-2 px-4">
          <div className="row">
            {repos?.map((item: any, index: any) => {
              return (
                <div key={index} className="col-md-6 col-12">
                  <Card
                    name={item?.name}
                    description={item?.description}
                    language={item?.language}
                    stars={item?.stargazers_count}
                    forks={item?.forks_count}
                    url={item?.html_url}
                  />
                </div>
              );
            })}
          </div>
          <Pagination
            pagination_length={pagination_length}
            previous={[`/${user}?page=${+page - 1}`, `/${user}`]}
            next={[`/${user}?page=${+page + 1}`, `/${user}?page=${+page}`]}
            page={+page as number}
            user={user as string}
          />
        </div>
      )}
    </div>
  );
}

export default User;

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const { user, page = 1 } = context.query;
  const res = await fetch(`https://api.github.com/users/${user}`, {
    headers: {
      Authorization: "token " + process.env.GIT_ACCESS_TOKEN,
    },
  });
  const data = await res.json();
  const repos = await fetch(
    `https://api.github.com/users/${user}/repos?page=${page}&per_page=10`,
    {
      headers: {
        Authorization: "token " + process.env.GIT_ACCESS_TOKEN,
      },
    }
  );
  const repos_data = await repos.json();
  if (data?.message === "Not Found") {
    return {
      notFound: true,
    };
  }

  if (data?.message?.includes("API rate limit exceeded for")) {
    return {
      props: {
        data: { message: "API rate limit exceeded" },
        repos: [],
      },
    };
  }

  return {
    props: {
      data,
      repos: repos_data,
    },
  };
}
