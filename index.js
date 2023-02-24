addEventListener("fetch", (event) => event.respondWith(handleRequest(event.request)));

async function handleRequest(request) {
  const drupal_host = "https://live-international-budget-partnership.pantheonsite.io";
  const wp_host = "https://www2.internationalbudget.org";
  // const wp_paths = [
  //   "/wp-content",
  //   "/open-budget-survey",
  //   "/open-budget-survey/roadmap-to-61",
  //   "/open-budget-survey/open-budget-survey-",
  //   "/open-budget-survey/regional-report-",
  //   "/open-budget-survey/encuesta-de-presupuesto-abierto-",
  //   "/open-budget-survey/enquete-sur-le-budget-ouvert-",
  //   "/open-budget-survey/inquerito-sobre-o-orcamento-aberto-",
  //   "/open-budget-survey/obzor-otkrytosti-byudzheta-",
  //   "/open-budget-survey/msh-almwaznt-almftwht-lam-",
  //   "/open-budget-survey/a-note-on-russias-performance-on-the-open-budget-index",
  //   "/open-budget-survey/sector-budget-transparency",
  //   "/letter-from-our-executive-director-on-the-conflict-in-ukraine",
  //   "/ru-letter-from-our-executive-director-on-the-conflict-in-ukraine",
  //   "/the-search-for-a-new-executive-director",
  //   "/annualreport2021",
  // ];
  const drupal_paths = [
    "/open-budget-survey/rankings",
    "/open-budget-survey/country-results",
    "/ar/open-budget-survey/country-results",
    "/es/open-budget-survey/country-results",
    "/fr/open-budget-survey/country-results",
    "/hu/open-budget-survey/country-results",
    "/hy/open-budget-survey/country-results",
    "/id/open-budget-survey/country-results",
    "/ka/open-budget-survey/country-results",
    "/kk/open-budget-survey/country-results",
    "/mk/open-budget-survey/country-results",
    "/mn/open-budget-survey/country-results",
    "/ne/open-budget-survey/country-results",
    "/prs/open-budget-survey/country-results",
    "/ps/open-budget-survey/country-results",
    "/pt-pt/open-budget-survey/country-results",
    "/ro/open-budget-survey/country-results",
    "/ru/open-budget-survey/country-results",
    "/sl/open-budget-survey/country-results",
    "/uk/open-budget-survey/country-results",
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

  if (destination_url.indexOf("www.") > -1) {
    let non_www_url = url.toString().replace("www.", "");
    return Response.redirect(non_www_url, 301);
    // return new Response("", {
    //   status: 301,
    //   headers: { Location: non_www_url },
    // });
  }
  // for (let i = 0; i < wp_paths.length; i++) {
  //   if (url_path.indexOf(wp_paths[i]) > -1) {
  //     if (url_path.indexOf("/open-budget-survey") > -1) {
  //       if (
  //         url_path == "/open-budget-survey/roadmap-to-61" ||
  //         url_path == "/open-budget-survey/a-note-on-russias-performance-on-the-open-budget-index" ||
  //         url_path == "/open-budget-survey/sector-budget-transparency"
  //       ) {
  //         destination_url = wp_host + url_path.replace("/open-budget-survey", "");
  //       } else if (
  //         url_path.indexOf("/open-budget-survey/open-budget-survey-") > -1 ||
  //         url_path.indexOf("/open-budget-survey/encuesta-de-presupuesto-abierto-") > -1 ||
  //         url_path.indexOf("/open-budget-survey/enquete-sur-le-budget-ouvert-") > -1 ||
  //         url_path.indexOf("/open-budget-survey/inquerito-sobre-o-orcamento-aberto-") > -1 ||
  //         url_path.indexOf("/open-budget-survey/obzor-otkrytosti-byudzheta-") > -1 ||
  //         url_path.indexOf("/open-budget-survey/msh-almwaznt-almftwht-lam-") > -1 ||
  //         url_path.indexOf("/open-budget-survey/regional-report-") > -1
  //       ) {
  //         destination_url = url_path == "/open-budget-survey/open-budget-survey-2021" ? `${wp_host}/open-budget-survey-2021` : drupal_host + url_path + url.search;
  //       } else if (url_path == "/open-budget-survey") {
  //         destination_url = wp_host;
  //       }
  //     } else {
  //       destination_url = wp_host + url_path + url.search;
  //     }
  //   }
  // }

  for (let i = 0; i < drupal_paths.length; i++) {
    if (url.pathname.indexOf(drupal_paths[i]) > -1) {
      destination_url = drupal_host + url.pathname + url.search;

      if (drupal_paths[i].indexOf("/open-budget-survey/country-results") !== -1) {
        let cmap = [
          { en: "afghanistan", ps: "afghanstan", prs: "afghanstan" },
          { en: "algeria", fr: "algerie", ar: "aljzayr" },
          { en: "armenia", hy: "hayastani-hanrapetowtyown" },
          { en: "azerbaijan", ru: "azerbaydzhan" },
          { en: "brazil", "pt-pt": "brasil" },
          { en: "cameroon", fr: "cameroun" },
          { en: "chad", fr: "tchad" },
          { en: "comoros", fr: "comores", ar: "jzr-alqmr" },
          { en: "democratic-republic-congo", es: "republica-dominicana" },
          { en: "equatorial-guinea", es: "guinea-ecuatorial" },
          { en: "egypt", ar: "misr" },
          { en: "georgia", ka: "sakartvelo" },
          { en: "hungary", hu: "magyarorszag" },
          { en: "iraq", ar: "aalraq" },
          { en: "jordan", ar: "alardn" },
          { en: "kazakstan", ru: "kazakhstan", kk: "kazakstan" },
          { en: "kyrgyz-republic", ru: "kyrgyzskaya-respublika" },
          { en: "lebanon", ar: "libnan", fr: "liban" },
          { en: "mongolia", mn: "mongol-uls" },
          { en: "morocco", fr: "maroc", ar: "almghrb" },
          { en: "mozambique", "pt-pt": "mocambique" },
          { en: "nepal", ne: "naepaala" },
          { en: "qatar", ar: "qtr" },
          { en: "russia", ru: "rossiya" },
          { en: "saudi-arabia", ar: "almmlkt-alrbyt-alswdyt" },
          { en: "slovenia", sl: "slovenija" },
          { en: "spain", es: "espana" },
          { en: "sudan", ar: "alswdan" },
          { en: "tajikistan", ru: "tadzhikistan" },
          { en: "timor-leste", "pt-pt": "republica-democratica-de-timor-leste" },
          { en: "tunisia", fr: "tunisie", ar: "twns" },
          { en: "ukraine", uk: "ukrayina", ru: "ukraina" },
          { en: "yemen", ar: "aalymn" },
        ];

        for (const country in cmap) {
          for (const lang in cmap[country]) {
            if (url_path.indexOf(cmap[country][lang]) !== -1 && url_path.indexOf(`/${lang}`) !== 0 && lang !== "en") {
              return new Response("", {
                status: 301,
                headers: {
                  Location: `/${lang}${url_path}`,
                },
              });
            }
          }
        }

        // return new Response(url_path.indexOf("/es"));

        // let countries_map = {
        //   aljzayr: "algeria",
        //   maroc: "morocco",
        //   rossiya: "russia",
        //   kazakstan: "kazakhstan",
        //   algerie: "algeria",
        //   azerbaydzhan: "azerbaijan",
        //   almghrb: "morroco",
        //   "kyrgyzskaya-respublika": "kyrgyzskaya-respublika",
        //   lbnan: "lebanon",
        //   misr: "eygpt",
        //   brasil: "brazil",
        //   "mongol-uls": "mongolia",
        //   alardn: "jordan",
        //   liban: "lebanon",
        //   sakartvelo: "georgia",
        //   cameroun: "cameroon",
        //   tchad: "chad",
        //   ukraina: "ukraine",
        //   ukrayina: "ukraine",
        //   naepaala: "nepal",
        //   "severna-makedonija": "north-macedonia",
        //   "republique-democratique-du-congo": "democratic-republic-congo",
        //   "guinea-ecuatorial": "equatorial-guinea",
        //   twns: "tunisia",
        //   "republica-dominicana": "dominican-republic",
        //   "almmlkt-alrbyt-alswdyt": "saudi-arabia",
        //   mocambique: "mozambique",
        //   aalymn: "yemen",
        //   aalraq: "iraq",
        //   tunisie: "tunisia",
        //   slovenija: "slovenia",
        //   "republica-democratica-de-timor-leste": "timor-leste",
        //   espana: "spain",
        //   tadzhikistan: "tajikistan",
        //   qtr: "qatar",
        //   alswdan: "sudan",
        //   "jzr-alqmr": "comoros",
        //   comores: "comoros",
        //   magyarorszag: "hungary",
        //   "hayastani-hanrapetowtyown": "armenia",
        //   afghanstan: "afghanistan",
        // };

        // let countries = Object.keys(countries_map);

        // for (let j = 0; j < countries.length; j++) {
        //   if (url.pathname.indexOf(countries[j]) > -1) {
        //     destination_url = destination_url.replace(countries[j], countries_map[countries[j]]);
        //   }
        // }
      }
    }
  }

  if (
    url_path.indexOf("/open-budget-survey/encuesta-de-presupuesto-abierto-") > -1 ||
    url_path.indexOf("/open-budget-survey/enquete-sur-le-budget-ouvert-") > -1 ||
    url_path.indexOf("/open-budget-survey/inquerito-sobre-o-orcamento-aberto-") > -1 ||
    url_path.indexOf("/open-budget-survey/obzor-otkrytosti-byudzheta-") > -1 ||
    url_path.indexOf("/open-budget-survey/msh-almwaznt-almftwht-lam-") > -1 ||
    url_path.indexOf("/open-budget-survey/regional-report-") > -1
  ) {
    destination_url = drupal_host + url.pathname + url.search;
  }

  if (url_path == "/open-budget-survey/open-budget-index-rankings") {
    return new Response("", {
      status: 301,
      headers: { Location: url.toString().replace("open-budget-index-rankings", "rankings") },
    });
  }

  if (url_path == "/open-budget-survey/results-by-country") {
    return new Response("", {
      status: 301,
      headers: { Location: url.toString().replace("results-by-country", "country-results") },
    });
  }

  if (destination_url && url.protocol === "http:") {
    https_url = url.toString().replace("http://", "https://");
    return new Response.redirect(https_url, 301);
    // return new Response("", {
    //   status: 301,
    //   headers: { Location: https_url },
    // });
  }

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
