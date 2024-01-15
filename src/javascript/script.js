// define os campos que será traga no json ao fazer a requisição na API
const campos = "media_type,media_url,thumbnail_url,permalink";
// define limite de quantos será trago pela api
const limite = 20;
// token que deve ser pego na meta developer da conta que deseja trazer os posts
const token = "SEU_TOKEN_DO_META_DEVELOPERS_AQUI";
// cria a base da url com os campos que criamos acima
const baseURL = `https://graph.instagram.com/me/media?fields=${campos}&access_token=${token}&limit=${limite}`;

fetch(baseURL)
  .then((response) => response.json())
  .then((data) => {
    // seleciona o container que iremos criar os as divs com post dentro
    const container = document.querySelector(".slider");

    data.data.forEach((img) => {
      const mediaType = img.media_type;
      const mediaUrl = img.media_url;
      const postUrl = img.permalink;
      const thumbVideo = img.thumbnail_url;

      // Verifica se o formato da midia é imagem ou vídeo
      if (mediaType === "IMAGE" || mediaType === "CAROUSEL_ALBUM") {
        const slide = document.createElement("a"); // Cria um elemento 'a'
        slide.classList.add("slide");
        slide.href = postUrl; // coloca a url do post traga pela api no href
        slide.setAttribute("target", "_blank"); // define para em uma nova guia

        // Cria uma div e adiconar uma classe nela
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("container-img");

        // Cria um elemento img e coloca o src com o link da imagem
        const image = document.createElement("img");
        image.src = mediaUrl;

        // Cria o icone do instagram em cima do post, que só é exibido com hover, tratado em css.
        const instagramIcon = document.createElement("i");
        instagramIcon.classList.add("bi", "bi-instagram", "instagram-icon");

        imageContainer.appendChild(image);
        imageContainer.appendChild(instagramIcon);
        slide.appendChild(imageContainer);
        container.appendChild(slide);
      } else if (mediaType === "VIDEO") {
        const slide = document.createElement("a");
        slide.classList.add("slide");
        slide.href = postUrl;
        slide.setAttribute("target", "_blank");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("container-img");

        // Cria um elemento img e coloca o src com o link da imagem mas pegando o link da thumbnail por ser um vídeo e não o vídeo em si
        const image = document.createElement("img");
        image.src = thumbVideo;

        // Por ser vídeo, troquei o icone do instagram por um de play
        const instagramIcon = document.createElement("i");
        instagramIcon.classList.add("bi", "bi-play", "instagram-icon");

        imageContainer.appendChild(image);
        imageContainer.appendChild(instagramIcon);
        slide.appendChild(imageContainer);
        container.appendChild(slide);
      }
    });

    // Define as configurações do slide que estamos usando a api do Slick JS, colocando breakpoint para deixar responsivo
    $(".slider").slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 4,
      arrows: false,
      responsive: [
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1520,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  })
  .catch((error) => console.log(error));
