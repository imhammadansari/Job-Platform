import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ViewAllJobs from '../Components/ViewAllJobs'
import Search from '../Components/Search'
import axios from 'axios'
import Footer from '../Components/Footer'

const HomePage = () => {

  const [searchValue, setSearchValue] = useState('');
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  console.log("HomePage Search Value", searchValue);


  const fetchJobs = async () => {
          try {
              const response = await axios.get('http://localhost:8000/jobs/viewJobs');
              setAllJobs(response.data);
              setJobs(response.data);
              console.log(response.data)
          } catch (error) {
              console.log(error.message);
          }
    }

    const fetchFilteredJobs = (e) => {
      e.preventDefault();

      if(searchValue === ''){
        setAllJobs(jobs)
      }
      else{
        const searchTerm = searchValue.toLowerCase().trim();

        if (!searchTerm) {
            setAllJobs(allJobs);
          }
    
        const filteredJob = jobs.filter(job => {
          const fieldjobs = [
            job.title
          ].filter(field => field != null).map(field => field.toString().toLowerCase());
          return fieldjobs.some(field => field.includes(searchTerm));
        })
    
        setAllJobs(filteredJob);
      }
    }

      useEffect (() => {
        fetchJobs();
      }, [])

  return (
    <>
    <Header />
    <Search searchValue={searchValue} setsearchValue={setSearchValue} onSearch={fetchFilteredJobs}/>
    <ViewAllJobs searchJobs={allJobs}/>
    <Footer />
    </>
  )
}

export default HomePage