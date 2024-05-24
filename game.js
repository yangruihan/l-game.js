// init vm
const vm = new Interpreter();
CoreLib.registerLib(vm);
CoreLib.outputCallback = s => console.log(s);
JsLib.registerLib(vm);

const code = `
; ----- vector2 -----
(def! new-v2 (fn* [x y] (new 'Vector2 x y)))
(defmacro! v2-set (fn* [v prop value] \`(.= ~v ~prop ~value)))
(defmacro! v2-get (fn* [v prop] \`((symbol (str '. ~prop)) ~v)))
(def! v2-print (fn* [v] (println "(" (.x v) ", " (.y v) ")")))
(def! v2-set-x (fn* [v value] (v2-set v 'x value)))
(def! v2-set-y (fn* [v value] (v2-set v 'y value)))
(def! v2-get-x (fn* [v] (v2-get v 'x)))
(def! v2-get-y (fn* [v] (v2-get v 'y)))

(defmacro! v2-change (fn* [v prop symbol value]
    \`(v2-set ~v ~prop (~symbol (v2-get ~v ~prop) ~value))
))
(def! v2-add-x (fn* [v value] (v2-change v 'x + value)))
(def! v2-sub-x (fn* [v value] (v2-change v 'x - value)))
(def! v2-mul-x (fn* [v value] (v2-change v 'x * value)))
(def! v2-div-x (fn* [v value] (v2-change v 'x / value)))
(def! v2-add-y (fn* [v value] (v2-change v 'y + value)))
(def! v2-sub-y (fn* [v value] (v2-change v 'y - value)))
(def! v2-mul-y (fn* [v value] (v2-change v 'y * value)))
(def! v2-div-y (fn* [v value] (v2-change v 'y / value)))

; --------------------

(def! new-color (fn* [r g b a] (new 'Color r g b a)))

; ----- input api -----
(def! *key-left-arrow* 37)
(def! *key-right-arrow* 39)
(def! *key-up-arrow* 38)
(def! *key-down-arrow* 40)

(def! is-key-down (fn* [key] 
    (= 1 ($keyIsDown key))
))
; ---------------------

; ----- draw api -----
(def! draw-rect (fn* [pos size color angle] ($drawRect pos size color angle)))
; --------------------

; ----- player -----
(def! player {
    :pos (new-v2 0 0)
    :size (new-v2 1 1)
    :color (new-color 1 0 0 1)
    :angle 0
    :speed 0.1
    :rotation 0
    :rotation-speed 1
})

(def! handle-player-input (fn* []
    (if (true? (is-key-down *key-left-arrow*))
        (v2-sub-x (get player :pos) (get player :speed))
    )

    (if (true? (is-key-down *key-right-arrow*))
        (v2-add-x (get player :pos) (get player :speed))
    )

    (if (true? (is-key-down *key-up-arrow*))
        (v2-add-y (get player :pos) (get player :speed))
    )

    (if (true? (is-key-down *key-down-arrow*))
        (v2-sub-y (get player :pos) (get player :speed))
    )
))

(def! player-update (fn* []
    (handle-player-input)
))

(def! player-render (fn* []
    (draw-rect (get player :pos) 
               (get player :size)
               (get player :color)
               (get player :angle)
    )
))
;--------------------

(def! init (fn* []))

(def! update (fn* []
    (player-update)
))

(def! update-post (fn* []))

(def! render (fn* []
    (player-render)
))

(def! render-post (fn* []))

($engineInit init update update-post render render-post)
`;

vm.rep(`(do ${code})`);
