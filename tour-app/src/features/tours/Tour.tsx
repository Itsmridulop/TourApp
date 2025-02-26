// import { useTours } from "./useTours";
// import type { TourType } from "../../types/tourTypes";
// import { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { ResponseType } from "@/types/userType";

// import TourCard from "./TourCard";
// import Spinner from "../../component/Spinner";
// import Modal from "@/component/Modal";
// import TourEditForm from "./EditTourForm";
// import Filter from "@/component/Filter";
// import Sort from "@/component/Sort";

// export interface QueryType {
//     filterValue: string;
//     filterField: string;
//     sortBy: string;
//     best: boolean
// }

// function Tour() {
//     const [queryStr, setQueryStr] = useState<QueryType>({ filterField: "", filterValue: "", sortBy: "", best: false });

//     const queryClient = useQueryClient()
//     const user: ResponseType | undefined = queryClient.getQueryData(['user'])
//     const { tours, isLoading } = useTours((queryStr.filterField && queryStr.filterValue) || queryStr.sortBy ? `${queryStr.filterField}` + (queryStr.filterField === 'difficulty' || queryStr.filterField === "" ? "" : '[lte]') + `=${queryStr.filterValue}&sort=${queryStr.sortBy}` : " ", queryStr.best);

//     const handleFilterChange = (query: QueryType) => {
//         setQueryStr(query)
//     }

//     const handleSortChange = (query: QueryType) => {
//         setQueryStr(query)
//     }

//     if (isLoading) return <Spinner />;

//     return (
//         <div className="flex flex-col min-h-screen text-white">
//             <div className="flex justify-between items-center w-full px-4 py-6  space-x-4">
//                 <button
//                     className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-700 transition-colors"
//                     onClick={() => setQueryStr({
//                         ...queryStr,
//                         best: !queryStr.best
//                     })}
//                 >
//                     Best Tours
//                 </button>
//                 <Filter onFilterChange={handleFilterChange} queryObj={queryStr} />
//                 <Sort onSortChange={handleSortChange} queryObj={queryStr} />
//                 {(user?.data.role === 'admin' || user?.data.role === 'lead-guide') && <Modal>
//                     <Modal.Open opens="createTour">
//                         <button
//                             className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-green-700 transition-colors"
//                         >
//                             Create New Tour
//                         </button>
//                     </Modal.Open>
//                     <Modal.Window name="createTour">
//                         <TourEditForm title="Create Tour" />
//                     </Modal.Window>
//                 </Modal>}
//             </div>

//             <main className="flex-grow flex flex-col items-center text-xl p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
//                     {tours?.data && tours.data.map((tour: TourType) => (
//                         <TourCard key={tour._id} tour={tour} />
//                     ))}
//                 </div>
//             </main>
//         </div>
//     );
// }

// export default Tour;



import { useTours } from "./useTours";
import type { TourType } from "../../types/tourTypes";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseType } from "@/types/userType";

import TourCard from "./TourCard";
import Spinner from "../../component/Spinner";
import Modal from "@/component/Modal";
import TourEditForm from "./EditTourForm";
import Filter from "@/component/Filter";
import Sort from "@/component/Sort";

export interface QueryType {
  filterValue: string;
  filterField: string;
  sortBy: string;
  best: boolean;
}

function Tour() {
  const [queryStr, setQueryStr] = useState<QueryType>({
    filterField: "",
    filterValue: "",
    sortBy: "",
    best: false,
  });

  const queryClient = useQueryClient();
  const user: ResponseType | undefined = queryClient.getQueryData(["user"]);
  const { tours, isLoading } = useTours(
    (queryStr.filterField && queryStr.filterValue) || queryStr.sortBy
      ? `${queryStr.filterField}` +
          (queryStr.filterField === "difficulty" || queryStr.filterField === ""
            ? ""
            : "[lte]") +
          `=${queryStr.filterValue}&sort=${queryStr.sortBy}`
      : " ",
    queryStr.best,
  );

  const handleFilterChange = (query: QueryType) => {
    setQueryStr(query);
  };

  const handleSortChange = (query: QueryType) => {
    setQueryStr(query);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col min-h-screen text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 py-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          onClick={() =>
            setQueryStr({
              ...queryStr,
              best: !queryStr.best,
            })
          }
        >
          Best Tours
        </button>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
          <Filter onFilterChange={handleFilterChange} queryObj={queryStr} />
          <Sort onSortChange={handleSortChange} queryObj={queryStr} />
        </div>

        {(user?.data.role === "admin" || user?.data.role === "lead-guide") && (
          <Modal>
            <Modal.Open opens="createTour">
              <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-green-700 transition-colors w-full sm:w-auto">
                Create New Tour
              </button>
            </Modal.Open>
            <Modal.Window name="createTour">
              <TourEditForm title="Create Tour" />
            </Modal.Window>
          </Modal>
        )}
      </div>

      <main className="flex-grow flex flex-col items-center text-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
          {tours?.data &&
            tours.data.map((tour: TourType) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
        </div>
      </main>
    </div>
  );
}

export default Tour;
