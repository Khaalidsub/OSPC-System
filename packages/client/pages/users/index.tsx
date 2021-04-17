import React from "react";

export const Users = () => {
  return (
    <div className="mx-4 lg:mx-32 xl:mx-80 my-4 " >
      <div className="items-stretch flex flex-col space-y-10">
        <div className=" flex flex-row space-x-4">
          <img src="/fake_images/Rectangle 796.png" className="h-48 w-48 object-fill rounded-lg" alt="" />
          <div className="flex-grow  flex flex-col  items-stretch space-y-8">
            <div className=" flex flex-row items-center justify-between">
              <h3 className="text-4xl">Ida Sunntag</h3>
              <div className="bg-badgs p-1 rounded-md">
                <h3 className="text-secondary text-xs" >Top Rated</h3>
              </div>
            </div>
            <h4>Specialization</h4>


          </div>

        </div>

        <div className="bg-white shadow-md rounded-md p-6  prose-md">
          <p className="line-clamp-4">Deserunt esse anim cillum eu ad nulla ipsum in nisi. Mollit deserunt do ut enim incididunt occaecat eu. In aliqua incididunt amet consequat eiusmod laborum nisi non anim pariatur culpa dolore cupidatat dolor. Laborum velit eu excepteur aliquip ea ullamco.
          Ut veniam ut velit fugiat. Id culpa in veniam deserunt nulla laboris. Quis ex Lorem nisi esse ex et adipisicing sit aute magna ex quis. Labore eu officia anim mollit laboris duis ex do fugiat fugiat enim incididunt. Et et laboris irure anim ea irure excepteur aute. Minim aute elit eiusmod do ad qui magna veniam culpa est eiusmod velit ea.
          Magna commodo duis eiusmod elit ex enim ea irure et in ex Lorem qui nisi. Minim Lorem eu deserunt labore commodo pariatur incididunt officia. Deserunt culpa laborum cillum non. Veniam tempor ut occaecat eiusmod labore cupidatat amet eu aliquip culpa ex duis minim id. Culpa eiusmod laboris non pariatur mollit eu. Aliquip enim commodo velit officia.
Exercitation elit adipisicing Lorem exercitation ex laboris culpa minim sit non aute aute sunt nulla. Amet ut voluptate do ex et aute voluptate cillum fugiat ut labore esse velit. Sint dolore est quis pariatur Lorem cillum magna qui in.</p>

        </div>
        <div className="bg-white rounded-md p-3 shadow-md ">
          <h2 className="text-3xl">Schedule</h2>

        </div>
      </div>

    </div>

  )
};

export default Users;
