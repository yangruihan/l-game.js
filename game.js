// init vm
const vm = new Interpreter();
CoreLib.registerLib(vm);
CoreLib.outputCallback = s => console.log(s);
JsLib.registerLib(vm);

fetch("/game.lisp")
    .then(rsp => rsp.text())
    .then(code => {
        vm.rep(`(do ${code})`);
    });
