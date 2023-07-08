document.addEventListener('DOMContentLoaded', function () {
  const emailElement = document.querySelector('.email');

  emailElement.addEventListener('click', function () {
    const emailText = emailElement.textContent;

    navigator.clipboard
      .writeText(emailText)
      .then(function () {
        console.log('E-mail copiado com sucesso: ' + emailText);
        alert('E-mail copiado com sucesso: ' + emailText);
      })
      .catch(function (error) {
        console.error('Falha ao copiar e-mail: ', error);
        alert('Falha ao copiar e-mail. Por favor tente novamente');
      });
  });
});
