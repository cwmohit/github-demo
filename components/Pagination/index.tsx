import Link from "next/link";
import React from "react";

function Pagination({
  pagination_length,
  previous,
  next,
  page,
  user,
}: {
  pagination_length: number;
  previous: string[];
  next: string[];
  page: number;
  user: string;
}) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <Link
          href={`${
            typeof page === "string" && +page > 1
              ? `${previous[0]}`
              : `/${user}`
          }`}
        >
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
        </Link>
        {Array.from(Array(pagination_length).keys()).map((item) => {
          return (
            <Link key={item} href={`/${user}?page=${item + 1}`}>
              <li className="page-item">
                <a className="page-link" href="#">
                  {item + 1}
                </a>
              </li>
            </Link>
          );
        })}
        <Link
          href={+page <= pagination_length - 1 ? `${next[0]}` : `/${next[1]}`}
        >
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Pagination;
