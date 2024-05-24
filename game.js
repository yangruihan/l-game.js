// init vm
const vm = new Interpreter();
CoreLib.registerLib(vm);
CoreLib.outputCallback = s => console.log(s);
JsLib.registerLib(vm);

const code = `
(def! new-v2 (fn* [x y] (new 'Vector2 x y)))
(def! new-color (fn* [r g b a] (new 'Color r g b a)))

(def! draw-rect (fn* [pos size color angle] ($drawRect pos size color angle)))

(def! init (fn* []))

(def! update (fn* []))

(def! update-post (fn* []))

(def! render (fn* []
    (draw-rect (new-v2 1 1) (new-v2 1 1) (new-color 1 0 0 1) 0)
))

(def! render-post (fn* []))

($engineInit init update update-post render render-post)
`;

vm.rep(`(do ${code})`);
