addEventListener("fetch", (event) => event.respondWith(handleRequest(event.request)));

async function handleRequest(request) {
  const drupal_host = "https://live-international-budget-partnership.pantheonsite.io";
  const wp_host = "https://www2.internationalbudget.org";
  const wp_paths = [
    "/wp-content",
    "/open-budget-survey",
    "/open-budget-survey/roadmap-to-61",
    "/open-budget-survey/open-budget-survey-",
    "/open-budget-survey/regional-report-",
    "/open-budget-survey/encuesta-de-presupuesto-abierto-",
    "/open-budget-survey/enquete-sur-le-budget-ouvert-",
    "/open-budget-survey/inquerito-sobre-o-orcamento-aberto-",
    "/open-budget-survey/obzor-otkrytosti-byudzheta-",
    "/open-budget-survey/msh-almwaznt-almftwht-lam-",
    "/open-budget-survey/a-note-on-russias-performance-on-the-open-budget-index",
    "/open-budget-survey/sector-budget-transparency",
    "/letter-from-our-executive-director-on-the-conflict-in-ukraine",
    "/the-search-for-a-new-executive-director",
    "/annualreport2021",
  ];
  const drupal_paths = [
    "/open-budget-survey/rankings",
    "/open-budget-survey/country-results",
    "/open-budget-survey/reports",
    "/sites/default",
    "/themes",
    "/modules",
    "/core",
    "/libraries",
    "/views",
  ];
  let url = new URL(request.url);
  let destination_url = url.toString();
  let url_path = url.pathname.replace(/\/$/, "");
  // let authenticate = false;

  for (let i = 0; i < wp_paths.length; i++) {
    if (url_path.indexOf(wp_paths[i]) > -1) {
      if (url_path.indexOf("/open-budget-survey") > -1) {
        if (
          url_path == "/open-budget-survey/roadmap-to-61" ||
          url_path == "/open-budget-survey/a-note-on-russias-performance-on-the-open-budget-index" ||
          url_path == "/open-budget-survey/sector-budget-transparency"
        ) {
          // authenticate = true;
          destination_url = wp_host + url_path.replace("/open-budget-survey", "");
        } else if (
          url_path.indexOf("/open-budget-survey/open-budget-survey-") > -1 ||
          url_path.indexOf("/open-budget-survey/encuesta-de-presupuesto-abierto-") > -1 ||
          url_path.indexOf("/open-budget-survey/enquete-sur-le-budget-ouvert-") > -1 ||
          url_path.indexOf("/open-budget-survey/inquerito-sobre-o-orcamento-aberto-") > -1 ||
          url_path.indexOf("/open-budget-survey/obzor-otkrytosti-byudzheta-") > -1 ||
          url_path.indexOf("/open-budget-survey/msh-almwaznt-almftwht-lam-") > -1 ||
          url_path.indexOf("/open-budget-survey/regional-report-") > -1
        ) {
          // authenticate = true;
          destination_url = url_path == "/open-budget-survey/open-budget-survey-2021" ? `${wp_host}/open-budget-survey-2021` : drupal_host + url_path + url.search;
        } else if (url_path == "/open-budget-survey") {
          // authenticate = true;
          destination_url = wp_host;
        }
      } else {
        destination_url = wp_host + url_path + url.search;
      }
    }
  }

  for (let i = 0; i < drupal_paths.length; i++) {
    if (url.pathname.indexOf(drupal_paths[i]) > -1) {
      // if (url.pathname == "/open-budget-survey/rankings") {
      //   authenticate = true;
      // } else if (url.pathname.indexOf("country-results/2021")) {
      //   authenticate = true;
      // }

      destination_url = drupal_host + url.pathname + url.search;
    }
  }

  if (destination_url && url.protocol === "http:") {
    https_url = url.toString().replace("http://", "https://");
    return new Response("", {
      status: 301,
      headers: { Location: https_url },
    });
  }

  // if (authenticate) {
  //   if (!request.headers.has("authorization")) {
  //     return _unauthorized("Please provide a Username and Password to access this page.");
  //   }

  //   const auth = request.headers.get("authorization");
  //   const credentials = _authorize(auth);

  //   if (credentials[0] !== USER || credentials[1] !== PWD) {
  //     return _unauthorized("Invalid password. Please try later.");
  //   }
  // }

  if (request.method == "GET") {
    const response = await fetch(
      new Request(destination_url, {
        method: request.method,
        headers: request.headers,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
      })
    );

    let new_response = new Response(response.body, response);
    new_response.headers.set("X-Robots-Tag", "all");

    return new_response;
  } else if (request.method == "POST") {
    const response = await fetch(
      new Request(destination_url, {
        method: request.method,
        headers: request.headers,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        body: await request.arrayBuffer(),
        redirect: "follow",
      })
    );

    if (typeof response.redirected != "undefined" && response.redirected == true) {
      let redirect_url = response.url.replace(drupal_host, "https://internationalbudget.org");

      return new Response("", { status: 302, headers: { Location: redirect_url } });
    }

    let new_response = new Response(response.body, response);
    new_response.headers.set("X-Robots-Tag", "all");
    return new_response;
  }
}

// function _authorize(auth) {
//   const parts = auth.split(" ");
//   const plain_auth = atob(parts[1]);
//   const credentials = plain_auth.split(":");

//   return credentials;
// }

// function _unauthorized(message) {
//   let response = new Response(message, {
//     status: 401,
//   });

//   response.headers.set("WWW-Authenticate", `Basic realm="${REALM}"`);

//   return response;
// }
