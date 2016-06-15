$(document).ready(function() {
    $.material.init();

    var wh = window.innerHeight;

    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

    var home = new ScrollMagic.Scene({
        triggerElement: '#one'
    })
        .setPin('#one')
        .loglevel(3)
        .addTo(ctrl);


    new ScrollMagic.Scene({
        triggerElement: '#two',
        triggerHook: 'onEnter'

    })
        .setPin('#two')
        .loglevel(3)
        .addTo(ctrl);

    new ScrollMagic.Scene({
        triggerElement: '#three'
    })
        .setPin('#three')
        .loglevel(3)
        .addTo(ctrl);

    //terminal
    var anim = false;
    function typed(finish_typing) {
        return function(term, message, delay, finish) {
            anim = true;
            var prompt = term.get_prompt();
            var c = 0;
            if (message.length > 0) {
                term.set_prompt('');
                var interval = setInterval(function() {
                    term.insert(message[c++]);
                    if (c == message.length) {
                        clearInterval(interval);
                        setTimeout(function() {
                            finish_typing(term, message, prompt);
                            anim = false;
                            finish && finish();
                        }, delay);
                    }
                }, delay);
            }
        };
    }
    var typed_message = typed(function(term, message, prompt) {
        term.set_command('');
        term.echo(message);
        term.set_prompt(prompt);
    });
    $('#terminal-home').terminal(function(cmd, term) {
        var msg = '';
        if (cmd === 'hi') {
            msg = '~ Hi, my name is Vladislav Ovcharenko. \n' +
                '~ I\'m software developer.\n' +
                '~ Being good at science I was graduated and worked as\n' +
                '~ an electronics engineer in 2014.\n' +
                '~ After I found myself in development.\n' +
                '~ Now coding & building web interfaces is my passion.\n' +
                '~ type list to see my skills\n' +
                '~ or scroll down to contact me';
            typed_message(term, msg, 80);
        } else if (cmd === 'list') {
            typed_message(term,
            '-------------------------CORE-----------------------\n'+
            '~ Java, Spring, Hibernate, JUnit\n' +
            '--------------------------WEB-----------------------\n' +
            '~ Javascript, AngularJs, GWT, JQuery, HTML, CSS\n' +
            '--------------------------DB------------------------\n' +
            '~ Oracle PL/SQL, PostgreSQL\n' +
            '-------------------------OTHER----------------------\n' +
            '~ WebServices, Design Patterns, Maven, Gradle'
                , 30);

        }
    }, {
        name: 'root',
        greetings: '                type hi to see my story',
        width: 400,
        height: 220,
        keydown: function(e) {
            if (anim) {
                return false;
            }
        }
    });


    $('#home-arrow').click(function () {
        home.scrollOffset(window.innerHeight);
    });
});
