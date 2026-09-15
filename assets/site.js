(() => {
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.nav');
  if (button && nav) {
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  }

  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const submitButton = document.getElementById('submitButton');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    successMessage?.classList.remove('show');
    errorMessage?.classList.remove('show');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@umltd.uk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'New enquiry from UMLTD.UK', _captcha: 'false' })
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      successMessage?.classList.add('show');
    } catch (error) {
      errorMessage?.classList.add('show');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send enquiry';
    }
  });
})();
