import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../slices/players.js";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { getAffiliate } from "../slices/affiliates";
import { click } from "@testing-library/user-event/dist/click.js";
import DecIncBalance from "../container/DecIncBalance.jsx";
import Affiliate from "../container/Affiliate.jsx";
import EditPlayer from "../container/EditPlayer.jsx";
import DeletePlayer from "../container/DeletePlayer.jsx";
import AddAffiliates from "../container/AddAffiliates.jsx";

const TablesAffiliate = ({openAddAffilii, setOpenAddAffilii}) => {
  const [open, setOpen] = useState(false);
  const [editPlayer, setEditPlayer] = useState(false);
  // const [openAddAffiliate, setOpenAddAffiliate] = useState(false);
  const [deletePlayer, setDeletePlayer] = useState(false);
  const [dataObj, setDataObj] = useState({});

  const cellClickedListener = useCallback((event) => {
    setDataObj(event.data);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClickOpenAddAffilii = () => {
  //   setOpenAddAffiliate(true);
  // };
  
  const handleClickDeletePlayer = () => {
    setDeletePlayer(true);
  };

  const handleClickOpenEditPlayer = () => {
    setTimeout(() => {
      setEditPlayer(true);
    }, 0);
  };

  const dispatch = useDispatch();

  const isAffiliates = useSelector(getAffiliate);

  const gridRef = useRef(); 
  const currencytRef = useRef(); 
  const [rowData, setRowData] = useState();

  const IconComponent = (props) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CurrencyExchangeIcon
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            handleClickOpen();
          }}
        />
        <RequestQuoteIcon
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            // handleClickOpenAddAffilii();
          }}
        />
        <BorderColorIcon
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            handleClickOpenEditPlayer();
          }}
        />
        <DeleteForeverIcon 
         style={{ cursor: "pointer" }}
         onClick={(e) => {
          handleClickDeletePlayer();
         }}
        />
      </div>
    );
  };

  const [columnDefs, setColumnDefs] = useState([
    { field: "affiliate", width: 340 },
    {
      field: "balance",

      width: 200,
      filter: "agNumberColumnFilter",
    },
    {
      field: "playersBalance",
      width: 200,
      filter: "agNumberColumnFilter",
    },
    {
      field: "weeklyRake",
 
      width: 200,
      filter: "agNumberColumnFilter",
    },
    {
      field: "percentage",
      width: 200,
      filter: "agNumberColumnFilter",
    },
    {
      field: "Actions",
      width: 200,
      filter: "agNumberColumnFilter",
      cellRenderer: "iconComponent",
      editable: false,
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      width: 150,
      editable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
    };
  });

  // Example of consuming Grid Event

  // Example load data from sever
  useEffect(() => {
    setRowData(isAffiliates?.affilii);
  }, [isAffiliates]);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);
  const sideBar = useMemo(() => {
    return {
      toolPanels: ["columns"],
    };
  }, []);
  const columnTypes = useMemo(() => {
    return {
      numberColumn: { width: 130, filter: "agNumberColumnFilter" },
      medalColumn: { width: 100, columnGroupShow: "open", filter: false },
      nonEditableColumn: { editable: false },
      dateColumn: {
       
        filter: "agDateColumnFilter",
 
        filterParams: {
      
          comparator: (filterLocalDateAtMidnight, cellValue) => {
       
            const dateParts = cellValue.split("/");
            const day = Number(dateParts[0]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[2]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
  }, []);

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "90vh" }}
      >
        <AgGridReact
          frameworkComponents={{
            iconComponent: IconComponent,
          }}
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          columnTypes={columnTypes}
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          sideBar={sideBar}
          rowGroup={true}
          rowGroupPanelShow={"always"}
        />

        <DecIncBalance open={open} setOpen={setOpen} dataObj={dataObj} />
        <AddAffiliates
          open={openAddAffilii}
          dataObj={dataObj}
          setOpen={setOpenAddAffilii}
        />

        {editPlayer && (
          <EditPlayer
            open={editPlayer}
            dataObj={dataObj}
            setOpen={setEditPlayer}
          />
        )}
        <DeletePlayer 
         open={deletePlayer}
         dataObj={dataObj}
         setOpen={setDeletePlayer}
        />
      </div>
    </div>
  );
};

export default TablesAffiliate;
