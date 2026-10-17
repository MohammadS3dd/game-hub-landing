// Set to the URL that receives the contact form (POST JSON). Leave empty until the backend is live.
const CONTACT_ENDPOINT = '';

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('contact-status');
  var submit = form.querySelector('button[type="submit"]');
  var lang = document.documentElement.lang === 'en' ? 'en' : 'fa';
  var text = {
    fa: {
      sending: 'در حال ارسال…',
      ok: 'پیام شما ثبت شد. به‌زودی با شما تماس می‌گیریم.',
      err: 'ارسال پیام انجام نشد. لطفاً دوباره تلاش کنید.'
    },
    en: {
      sending: 'Sending…',
      ok: 'Thanks, your message was sent. We will be in touch soon.',
      err: 'We could not send your message. Please try again.'
    }
  }[lang];

  // Inactive: the button stays disabled (set in the HTML) and nothing is sent.
  if (!CONTACT_ENDPOINT) return;

  submit.disabled = false;
  submit.removeAttribute('aria-disabled');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var body = {
      name: data.get('name'),
      contact: data.get('contact'),
      message: data.get('message'),
      lang: lang
    };

    submit.disabled = true;
    status.textContent = text.sending;

    fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        status.textContent = text.ok;
      })
      .catch(function () {
        status.textContent = text.err;
      })
      .then(function () {
        submit.disabled = false;
      });
  });
})();
