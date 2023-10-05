import { Input, Button, Alert } from "antd";
import React, { useState, useRef } from "react";
import { Job } from "../entities/Job";

const TodoForm: React.FC = () => {
  const [showError, setShowError] = useState(false);
  const [job, setJob] = useState<any>("");
  // Tao tham chieu den phan tu trong dom
  const inputRef: any = useRef();
  const [jobs, setJobs] = useState(() => {
    const jobLocal = JSON.parse(localStorage.getItem("jobs") || "[]");
    return jobLocal;
  });

  // Validate data
  const validateData = (name: string, value: string) => {
    if (name === "job") {
      if (!value) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    validateData(name, value);
    setJob({
      ...job,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Math.ceil(Math.random() * 1000),
      name: job.job,
      status: false,
    };
    if (!job.job) {
      setShowError(true);
    } else {
      //Cap nhat lai gia tri
      setJobs([...jobs, newJob]);
      //Day du lieu len local
      localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
      setJob("");
      //Focus vao o input ref sau khi submit
      inputRef.current.focus();
    }
  };
  const handleDelete = (id: number) => {
    // Loc ra id can xoa
    const newListJob = jobs.filter((job: Job) => job.id !== id);
    setJobs(newListJob);
    localStorage.setItem("jobs", JSON.stringify(newListJob));
  };

  //Cap nhat trang thai cong viec
  const handleChangeJobJob = (id: number) => {
    const updateJobLocal = jobs.map((job: Job) => {
      if (job.id === id) {
        job.status = !job.status;
      }
      return job;
    });
    setJobs(updateJobLocal);

    localStorage.setItem("jobs", JSON.stringify(updateJobLocal));
  };
  return (
    <div>
      <h3 className="text-2xl font-bold text-center">Danh sách công việc</h3>
      <form className="flex gap-1 mb-2" onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          placeholder="Add to works"
          onChange={handleChange}
          name="job"
          value={job.job}
        />
        <Button htmlType="submit" type="primary" className="bg-blue-600">
          Add
        </Button>
      </form>
      {showError ? (
        <Alert
          className="mb-2"
          message="Tên công việc không được để trống"
          type="error"
          showIcon
        />
      ) : (
        ""
      )}
      {jobs.length > 0 ? (
        <>
          {jobs.map((job: Job) => (
            <div className="border shadow mb-2" key={job.id}>
              <div className="flex justify-between items-center p-1">
                <div className="flex items-center gap-2">
                  <input
                    checked={job.status == true}
                    type="checkbox"
                    className="h-6"
                    onChange={() => handleChangeJobJob(job.id)}
                  />
                  {job.status ? <s>{job.name}</s> : <span>{job.name}</span>}
                </div>
                <Button danger onClick={() => handleDelete(job.id)}>
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {" "}
          <div className="border shadow mb-2">
            <div className="flex justify-center items-center p-1">
              <h3 className="text-center">Chưa có công việc</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoForm;
