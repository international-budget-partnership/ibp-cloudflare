addEventListener("fetch", (event) => event.respondWith(handleRequest(event.request)));

async function handleRequest(request) {
  const drupal_host = "https://live-international-budget-partnership.pantheonsite.io";
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
  let params = url.searchParams;

  if (destination_url && url.protocol === "http:") {
    https_url = url.toString().replace("http://", "https://");
    return new Response("", {
      status: 301,
      headers: { Location: https_url },
    });
  }

  if (destination_url.indexOf("www.") > -1) {
    let non_www_url = url.toString().replace("www.", "");
    return new Response("", {
      status: 301,
      headers: { Location: non_www_url },
    });
  }

  if (url_path.indexOf("data-documents") !== -1 || url_path.indexOf("downloads") !== -1) {
    return new Response("", {
      status: 301,
      headers: {
        Location: "https://survey.internationalbudget.org/#download",
      },
    });
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

  if (params.get("country")) {
    let countries = {
      bf: "burkina-faso",
      cn: "china",
      do: "dominican-republic",
      hn: "honduras",
      kr: "south-korea",
      lk: "sri-lanka",
      lr: "liberia",
      mm: "myanmar",
      ml: "mali",
      mn: "mongolia",
      mx: "mexico",
      mz: "mozambique",
      ng: "nigeria",
      nz: "new-zealand",
      pg: "papua-new-guinea",
      pk: "pakistan",
      st: "sao-tome-e-principe",
      sv: "el-salvador",
      tn: "tunisia",
      vn: "vietnam",
    };

    return new Response("", {
      status: 301,
      headers: {
        Location: `https://internationalbudget.org/open-budget-survey/country-results/2021/${countries[params.get("country")]}`,
      },
    });
  }

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
