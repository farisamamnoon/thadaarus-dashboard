import { DataGrid } from "@mui/x-data-grid";
import { Card, CardHeader, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "utils/fetchData";
import { useParams } from "react-router-dom";
import Error from "utils/Error";
import MarksChart from "pages/testForm/index";

function ExamMarks() {
  const studentId = useParams().id;
  const {
    data: marksData,
    error: marksError,
    isPending: marksIsPending,
  } = useQuery({
    queryKey: ["marksData"],
    queryFn: async () => fetchData(`student/${studentId}/marks`),
  });
  if (marksError) return <Error severity="error">An unexpected error occured</Error>;

  return (
    <div>
      {/* Breadcrumbs */}

      {/* <Breadcrumbs sx={{ mb: 4 }}>
        <Link href={/dashboard}>Home</Link>
        <Link href={/faq}>FAQ</Link>
        <Typography>Manage </Typography>
      </Breadcrumbs> */}
      <Card>
        <CardHeader
          title="Exam Marks"
          action={
            <div>
              <Button size="medium" variant="contained" component={Link} to={`add`}>
                Add Marks
              </Button>
            </div>
          }
        />
        {/* <DataGrid autoHeight rows={rows || []} columns={columns} getRowId={(row) => row._id} /> */}
        <MarksChart id={studentId} />
      </Card>
      {/* {openDeleteDialog && (
        <DeleteConfirmationDialog
          id={dialogId}
          buttonRef={buttonRef}
          name=""
          open={true}
          setOpen={setOpenDeleteDialog}
          // deleteFunction={deleteFaqData}
        />
      )} */}
    </div>
  );
}

export default ExamMarks;
