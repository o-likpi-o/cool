//form script
$(':required').on('blur keydown', function () {
    console.log('touched', this);
    $(this).addClass('touched');
});
$(document).ready(function () {
    var options_good = {
        'title': 'Отлично!',
        'style': 'success',
        'message': 'Ваша заявка отправлена! Наш менеджер в скором времени свяжется с Вами.',
        'icon': 'check',
    };
    var options_bad = {
        'title': 'Ошибка при отправке заявки.',
        'style': 'error',
        'message': 'Заполните обязательные поля и попробуйте ещё раз.',
        'icon': 'warning',
    };
    var good = new notify(options_good);
    var bad = new notify(options_bad);
    document.getElementById("form_inp_btn").addEventListener("click", post_message);
    function post_message() {
        function reformat(elementId, conc) {
            var element = document.getElementById(elementId);
            var param = (element.value.trim() || 0 !== element.value.trim().length) ? `${(conc || '') + elementId.slice(0, -4) + '=' + element.value.trim()}` : '';
            element.value = '';
            return param;
        }
        if (document.getElementById("name_inp").value && document.getElementById("phone_inp").value) {
            var request = new XMLHttpRequest();
            request.open("GET", `https://us-central1-tectum-s.cloudfunctions.net/emailMessage${reformat('name_inp', '?') + reformat('phone_inp', '&') + reformat('email_inp', '&') + reformat('description_inp', '&')}`, true);
            request.send();
            $("#name_inp").removeClass('touched');
            $("#phone_inp").removeClass('touched');
            request.onload = function () {
                if (request.status != 200) {
                    new notify({
                        'title': 'Ошибка при отправке заявки.',
                        'style': 'error',
                        'message': `При отправке заявки возникла ошибка. Попробуйте отправить заявку ещё раз или свяжитесь с менеджером самостоятельно.`,
                        'icon': 'warning',
                    }).show();
                } else {
                    good.show();
                }
            };
        } else {
            $("#name_inp").addClass('touched');
            $("#phone_inp").addClass('touched');
            bad.show();
        }
    }
});
