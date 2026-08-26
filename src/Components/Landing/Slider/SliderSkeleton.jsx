export default function SliderSkeleton() {

  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6
    ">

      {[1,2,3,4].map(item => (

        <div
          key={item}
          className="
            bg-white
            rounded-3xl
            p-5
            border
            animate-pulse
          "
        >

          <div className="
            h-64
            rounded-2xl
            bg-gray-200
          "/>


          <div className="
            mt-5
            h-4
            bg-gray-200
            rounded
          "/>


          <div className="
            mt-3
            h-4
            bg-gray-200
            rounded
            w-2/3
          "/>

        </div>

      ))}

    </div>
  );
}