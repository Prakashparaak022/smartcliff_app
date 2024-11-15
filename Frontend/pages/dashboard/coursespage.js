import React from "react";
import { Grid, Paper, CardContent, Typography } from "@mui/material";
import tasks from "../../server/db.json";
import Layout from "../Layout/index";

const Coursespage = () => {
  const softwareDevelopmentTasks = tasks.tasks.filter(
    (task) => task.name === "Software Development"
  );
  const automotiveIoTTasks = tasks.tasks.filter(
    (task) => task.name === "Automotive Embedded"
  );
  const testingTrackTasks = tasks.tasks.filter(
    (task) => task.name === "Testing Track"
  );
  const mechanicalDesignTasks = tasks.tasks.filter(
    (task) => task.name === "Mechanical Design"
  );

  return (
    <>
      <Layout>
        <section>
          <Grid container spacing={2} justifyContent="center">
            {[
              softwareDevelopmentTasks,
              automotiveIoTTasks,
              testingTrackTasks,
              mechanicalDesignTasks,
            ].map((categoryTasks) => (
              <React.Fragment key={categoryTasks[0]?.name}>
                {categoryTasks.length > 0 && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h4" style={{textAlign:'center'}}>
                        {categoryTasks[0].name}
                      </Typography>
                    </Grid>
                    {categoryTasks.map((task) => {
                      const isImageOnRight = task.id % 2 === 0;

                      return (
                        <Grid
                          item
                          lg={10}
                          sm={6}
                          md={6}
                          key={task.id}
                          style={{ padding: "2rem" }}
                        >
                          <Paper elevation={3} style={{ overflow: "hidden" }}>
                            <Grid container spacing={4} className="courses-card">
                              {isImageOnRight ? (
                                <>
                                  <Grid className="course-grid" item xs={6}>
                                    <Typography
                                      variant="h4"
                                      style={{
                                        fontWeight: "bold",
                                        marginBottom: "2rem",
                                      }}
                                    >
                                      {task.title}
                                    </Typography>
                                    <Typography variant="p">
                                      {task.description}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <img
                                      src={
                                        task.url
                                          ? task.url
                                          : "/assets/images/CoursesImage.jpeg"
                                      }
                                      alt={task.title}
                                      width={"100%"}
                                    />
                                  </Grid>
                                </>
                              ) : (
                                <>
                                  <Grid item xs={6}>
                                    <img
                                      src={
                                        task.url
                                          ? task.url
                                          : "/assets/images/CoursesImage.jpeg"
                                      }
                                      alt={task.title}
                                      style={{
                                        width: "100%",
                                        marginTop: "1rem",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </Grid>
                                  <Grid className="course-grid" item xs={6}>
                                    <Typography
                                      variant="h4"
                                      style={{
                                        fontWeight: "bold",
                                        marginBottom: "2rem",
                                      }}
                                    >
                                      {task.title}
                                    </Typography>
                                    <Typography variant="p">
                                      {task.description}
                                    </Typography>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </section>
      </Layout>
    </>
  );
};

export default Coursespage;
