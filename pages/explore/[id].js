// Libraries
import {useState, useEffect} from 'react'
import Head from 'next/head'
import styled from "styled-components"
import axios from 'axios'
import { useRouter } from 'next/router'

// Componenets
import { Navbar } from '../../components/Navbar/Navbar'
import ItemBox from '../../components/ItemBox/ItemBox'



export default function Explore({ ...props }){
	const [categoryData, setcategoryData] = useState(false)
	let router = useRouter()
	let queryStr = useRouter().query.id // get the query string from the url
  

  // Styled Components
	const StyledItembox = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;  
	`
  const StyledNavBar = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    `
  const StyledHeading = styled.h1`
    font-size: 0.5em;
    color: #F8893C
    padding-left: 1.5rem;
  `
  const StyledBackToExplore = styled.div`
    font-size:0.5em;
    color: #F8893C;
    padding-left: 1.5rem;
  `
	

	useEffect(() => {
    const abortController = new AbortController()

		// only fetch data after page is hydrated, so we have access to the 'queryStr' variable
		if(!router.isReady){
			return
		}
    
		// if the query string is empty is not 'arts', 'history', 'language', or 'culture', redirect to the explore page
		if (queryStr == undefined || (queryStr != 'arts' && queryStr != 'history' && queryStr != 'language' && queryStr != 'culture')) {
			router.push('/explore')
		}
	
		// fetch data for the category, after the query string is defined, then set the state
    ;(async () => {
      try {
        let response = await axios.get(`/api/devLocationsOfInterest/${queryStr}`, { signal: abortController.signal })
				let data = response.data.Results
				setcategoryData(data)
      } catch (error) {
        console.error(error)
        if (axios.isCancel(error)) {
          return
        }
      }
    })()
      return () => {
      abortController.abort()
    }
  }, [router.isReady])


  return (
  	<div>
      <Head>
        <title>Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <StyledBackToExplore>
        <h1>{queryStr}</h1>
        <h1>{"< Back To Explore..."}</h1>
      </StyledBackToExplore>
      
      <StyledItembox>
				{ categoryData ? 
          categoryData.map((categoryDataItem => {
            return <ItemBox 
              label={categoryDataItem.name}
              description={categoryDataItem.description}
              width="331.67px"
              height="230px"
							key={categoryDataItem.id}
            />
          }))
          : <p>Loading...</p>
        }
      </StyledItembox>

      <StyledNavBar> 
        <Navbar
          navPages={['Home', 'Explore', 'Contribute', 'Profile']}
          activePage={'Explore'}
        />
      </StyledNavBar>
    </div>
    )
}