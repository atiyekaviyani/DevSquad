import { motion } from "framer-motion";


export default function SliderProgress({
 progress = 0
}) {


return (

<div className="
w-full
h-1
bg-gray-200
rounded-full
overflow-hidden
mt-6
">


<motion.div

initial={{
width:0
}}

animate={{
width:`${progress}%`
}}

transition={{
duration:.4
}}

className="
h-full
bg-black
rounded-full
"

/>


</div>

)

}