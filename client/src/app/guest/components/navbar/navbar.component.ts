import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatagoryService } from '../../../services/catagory.service';

@Component({
  selector: 'app-guest-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class GuestNavbarComponent implements OnInit {

  listCatagory;
  commonImageUrl = environment.commonImageUrl;

  constructor(
    private catagoryService: CatagoryService
  ) { }

  ngOnInit() {
    this.getListCatagory();
  }

  // Function to get list catagory
  async getListCatagory() {
    try {
      const response  = await this.catagoryService.getCatagories(null, null, null, null);
      this.listCatagory = response.data.docs;
    } catch (error) {
      console.log(error);
    }
  }

}
