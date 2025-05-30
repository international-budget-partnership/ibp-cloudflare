addEventListener("fetch", (event) => event.respondWith(handleRequest(event.request)));

async function handleRequest(request) {
  const drupal_paths = [
    "/open-budget-survey/calculator",
    "/open-budget-survey/download",
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
    "/open-budget-survey/open-budget-survey-2021-",
    "/open-budget-survey/open-budget-survey-2023-",
    "/sites/default",
    "/themes",
    "/modules",
    "/core",
    "/libraries",
    "/views",
    "/get-map-data",
  ];

  let countries = {
    bf: "burkina-faso",
    cn: "china",
    do: "dominican-republic",
    hn: "honduras",
    kh: "combodia",
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
    td: "chad",
    tn: "tunisia",
    vn: "vietnam",
  };

  // let drupal_host = "https://live-international-budget-partnership.pantheonsite.io";
  let drupal_host = "https://rajanz2.sg-host.com";
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

  if (url_path.indexOf("data-documents") !== -1) {
    return new Response("", {
      status: 301,
      headers: {
        Location: "https://internationalbudget.org/open-budget-survey/download",
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

  if (url_path == "/opening-budgets/open-budget-initiative/open-budget-survey/country-info" && !params.get("country")) {
    return new Response("", {
      status: 301,
      headers: {
        Location: "https://internationalbudget.org/open-budget-survey/country-results",
      },
    });
  }

  if (url_path.indexOf("/who-does-budget-work/findgroup/group-data") !== -1) {
    let code = params.get("country");
    let country_post_ids = {
      kh: 5797,
      ml: 5808,
      td: 5845,
    };

    return new Response("", {
      status: 301,
      headers: {
        Location: `https://internationalbudget.org/network-directory/?_sfm_country=${country_post_ids[code]}`,
      },
    });
  }

  if (params.get("country") && url_path.indexOf("/opening-budgets/open-budget-initiative/open-budget-survey/country-info") !== -1) {
    let code = params.get("country");

    return new Response("", {
      status: 301,
      headers: {
        Location: `https://internationalbudget.org/open-budget-survey/country-results/2021/${countries[code]}`,
      },
    });
  }

  for (let i = 0; i < drupal_paths.length; i++) {
    if (url.pathname.indexOf(drupal_paths[i]) > -1) {
      destination_url = drupal_host + url.pathname + url.search;

      if (url_path.indexOf("/open-budget-survey") == 0) {
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
          { en: "kazakhstan", kk: "kazakstan" },
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
            if (url_path.indexOf(cmap[country][lang]) > -1 && lang !== "en") {
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
    url_path.indexOf("/open-budget-survey/inquerito-sobreo-orcamento-aberto-") > -1 ||
    url_path.indexOf("/open-budget-survey/encuesta-de-presupuesto-abierto-") > -1 ||
    url_path.indexOf("/open-budget-survey/enquete-sur-le-budget-ouvert-") > -1 ||
    url_path.indexOf("/open-budget-survey/inquerito-sobre-o-orcamento-aberto-") > -1 ||
    url_path.indexOf("/open-budget-survey/obzor-otkrytosti-byudzheta-") > -1 ||
    url_path.indexOf("/open-budget-survey/msh-almwaznt-almftwht-lam-") > -1 ||
    url_path.indexOf("/open-budget-survey/harnessing-open-budgets-fiscal-stability-sub-saharan-africa") > -1 ||
    url_path.indexOf("/open-budget-survey/les-budgets-ouverts-au-service-de-la-stabilite-financiere-en-afrique") > -1 ||
    url_path.indexOf("/open-budget-survey/strengthening-budget-transparency-and-accountability-middle-east-and-north") > -1 ||
    url_path.indexOf("/open-budget-survey/metodologia-do-inquerito-sobre-o-orcamento-aberto-") > -1 ||
    url_path.indexOf("/open-budget-survey/metodologia-de-la-encuesta-de-presupuesto-abierto-") > -1 ||
    url_path.indexOf("/open-budget-survey/regional-report-") > -1 ||
    (url_path.indexOf("/open-budget-survey/") > -1 && url_path.includes("-methodologie"))
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
