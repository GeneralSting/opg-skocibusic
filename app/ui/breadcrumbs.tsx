import { FC, Fragment } from "react";
import Link from "next/link";

export type Crumb = { label: string; href?: string };

/**
 * Trail of links ending in the current page. The last crumb carries
 * aria-current="page" and is not a link
 */
export const Breadcrumbs: FC<{
  crumbs: Crumb[];
  variant?: "dark" | "light";
}> = ({ crumbs, variant = "light" }) => (
  <nav aria-label="Navigacijski put" className={`breadcrumbs ${variant}`}>
    <ol>
      {crumbs.map((crumb, index) => (
        <Fragment key={crumb.label}>
          {index > 0 && (
            <li aria-hidden="true" className="crumb-sep">
              /
            </li>
          )}
          <li>
            {crumb.href ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              <span aria-current="page">{crumb.label}</span>
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  </nav>
);
