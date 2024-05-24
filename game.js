// init vm
const vm = new Interpreter();
CoreLib.registerLib(vm);
CoreLib.outputCallback = s => console.log(s);
JsLib.registerLib(vm);

const code = `
(def! new-v2 (fn* [x y] (new 'Vector2 x y)))
(def! new-color (fn* [r g b a] (new 'Color r g b a)))

(def! draw-rect (fn* [pos size color angle] ($drawRect pos size color angle)))

(def! vec2-add-x (fn* [vec value] 
    (let* [x (.x vec)]
        (.= vec 'x (+ x value))
    )
))

(def! player {
    :pos (new-v2 0 0)
    :size (new-v2 1 1)
    :color (new-color 1 0 0 1)
    :angle 0
    :speed 1
    :rotation 0
    :rotation-speed 1
})
(def! player-set-posx (fn* [x]
    (.= (get player :pos) 'x x)
))

(def! init (fn* []))

(def! update (fn* []
    (player-set-posx (+ (.x (get player :pos)) 0.1))
))

(def! update-post (fn* []))

(def! render (fn* []
    (draw-rect (get player :pos) 
               (get player :size)
               (get player :color)
               (get player :angle)
    )
))

(def! render-post (fn* []))

($engineInit init update update-post render render-post)
`;

vm.rep(`(do ${code})`);
