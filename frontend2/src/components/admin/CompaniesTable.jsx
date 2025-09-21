import React, { useEffect, useState } from "react";
import { Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";

import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Adjust the path if needed
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { useNavigate } from "react-router-dom";



const CompaniesTable = () => {
  const {companies,SearchCompanyByText}=useSelector(store=>store.company); // sari companies layi store se

  const [filterCompany,setFilterCompany]=useState(companies); // search option for company
  const navigate=useNavigate();

  useEffect(()=>{
    const filteredCompany=companies.length>=0 && companies.filter((company)=>{
      if(!SearchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(SearchCompanyByText.toLowerCase());
    })
    setFilterCompany(filteredCompany);
  },[companies,SearchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          filterCompany?.map((company) => (
            <tr key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={company.logo}
                    alt="Company Logo"
                  />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>

      </Table>
    </div>
  );
};

export default CompaniesTable;
