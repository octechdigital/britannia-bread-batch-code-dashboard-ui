import React from "react";
import Header from "../../components/header/Header";
import ViewButtonRenderer from "../../components/customElements/Buttons";
import API from "../../api";
import GenericAgGrid from "../../components/agGrid/GenericAgGrid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SectionAnim from "../../assets/lottie/SectionAnim";

const pendingColumnDefs = [
  { headerName: "Name", field: "name" },
  { headerName: "Mobile", field: "mobile" },
  { headerName: "Slab", field: "slab" },
  { headerName: "State", field: "state" },
  { headerName: "Win Amount", field: "winAmount" },
  { headerName: "Date", field: "date" },
  {
    field: "view",
    headerName: "View",
    cellRenderer: (params: any) => (
      <ViewButtonRenderer pageType="pendingPage" props={params} />
    ),
  },
];

const Pending: React.FC = () => {
  const isRefreshed = useSelector((state: RootState) => state.user.isRefreshed);

  return (
    <>
      <Header />
      <GenericAgGrid
        title="Pending Overview"
        columnDefs={pendingColumnDefs}
        fetchData={API.getPendingData}
        refreshStatus={isRefreshed}
        lottieFile={<SectionAnim type="pending" shouldPlay={true} />}
      />
    </>
  );
};

export default Pending;
