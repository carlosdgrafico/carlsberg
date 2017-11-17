$(document).ready(function(){

   $('select').material_select();
   $('.modal').modal();


   $('#edad').modal('open');
   $('.modal-overlay').css('pointer-events', 'none');
   $('#enviar').attr("disabled", true);


   if ($(window).width() <= 480) {
      $('#btn-menor').on('click', function(){
         $('.modal-overlay').css('pointer-events', 'inherit');
         $("#img-edad").attr("src","img/icon-error.png");
         $(".modalCarlsberg--contenido--imagen").css('background-image', 'none');
         $(".modalCarlsberg--contenido--imagen img").css({
            "margin-top": "10%",
            "width": "35%"
         });
         $(".modalCarlsberg--contenido--alert").css('display', 'inherit');
   	});
   } else {
      $('#btn-menor').on('click', function(){
         $('.modal-overlay').css('pointer-events', 'inherit');
         $("#img-edad").attr("src","img/icon-error.png");
         $(".modalCarlsberg--contenido--imagen").css('background-image', 'none');
         $(".modalCarlsberg--contenido--imagen img").css({
            "margin-top": "20%",
            "width": "50%"
         });
         $(".modalCarlsberg--contenido--alert").css('display', 'inherit');
   	});
   }


   var wow = new WOW(
     {
       boxClass:     'wow',      // animated element css class (default is wow)
       animateClass: 'animated', // animation css class (default is animated)
       offset:       0,          // distance to the element when triggering the animation (default is 0)
       mobile:       true,       // trigger animations on mobile devices (default is true)
       live:         true,       // act on asynchronously loaded content (default is true)
       callback:     function(box) {
         // the callback is fired every time an animation is started
         // the argument that is passed in is the DOM node being animated
       },
       scrollContainer: null,    // optional scroll container selector, otherwise use window,
       resetAnimation: true,     // reset animation on end (default is true)
     }
   );

   wow.init();


  $('#form').submit((event) => {
    event.preventDefault();

    let msg = 'Faltan los siguientes campos: '
    let attrs = []

    if (!$('#name').val()) {
      attrs.push('nombre')
    }

    if (!$('#lastName').val()) {
      attrs.push('apellido')
    }

    if (!$('#rut').val()) {
      attrs.push("rut")
    }

    if (!$('#phone').val()) {
      attrs.push("teléfono")
    }

    if (!$('#email').val()) {
      attrs.push("email")
    }

    if (!$('#code').val()) {
      attrs.push("código")
    }

    if (!$('#place').val()) {
      attrs.push("local")
    }

    if (!$('#terms').is(":checked")) {
      attrs.push("aceptar términos de acuerdo")
    }

    if (attrs.length > 0) {
      msg += attrs.toString() + '.'
      return alert(msg)
    }

    const code = $('#code').val()

    const values = {
      name: $('#name').val(),
      lastName: $('#lastName').val(),
      dni: $('#rut').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      place: $('#place').val(),
    }

    // console.log('code: ', code, values)

    axios.patch(`http://carlsberg-backend-dev.us-east-1.elasticbeanstalk.com/contest/${code}`, values)
      .then((response) => {
        // console.log(response);

        if (response.status === 200) {
          $('#perdedor.modal').modal('open')
        } else {
          $('#ganador.modal').modal('open')
        }
      })
      .catch((error, xhr) => {
        // if (error.response.status === 403) {
          $('#error.modal').modal('open')
        // }
        // alert('Ocurrió un error la momento de procesar el formulario, inténtelo más tarde.')
        console.log(error);
      });
  });
});
