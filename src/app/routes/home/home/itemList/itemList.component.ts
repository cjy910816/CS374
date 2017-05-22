import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import Any = jasmine.Any;
import {CartService, Item} from "../../../../shared/cart/cart.service";

import * as _ from "lodash";
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'app-item-list',
  templateUrl: 'itemList.component.html',
  styleUrls: ['itemList.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit {
  private items: Item[] = [];
  private sort='name';
  private userFilter : any = { name : '', category: this.categorizer };
  @ViewChild('detailModal') public detailModal:ModalDirective;
  private selectedItem;
  private categorizer='';


  constructor(public cartService: CartService) {
    this.items.push(new Item(1, "센카 퍼펙트 휍 N 클렌징 폼, 120g 2개", "./image/perfect_whip.jpg", 11300, "cleanser"));
    this.items.push(new Item(2, "크리넥스 순수 3겹 소프트 롤화장지 27m, 30롤 1개", "./image/paper_tissue.jpg", 13900, "tissue"));
    this.items.push(new Item(3, "뉴트로지나 딥클린 포밍 클렌저, 175g, 2개", "./image/deep_clean.jpg", 11300, "cleanser"));
    this.items.push(new Item(4, "동원샘물, 2L, 6개", "./image/water_2l.jpg", 3790, "water"));
    this.items.push(new Item(5, "동원샘물 500ml, 20개", "./image/water_500ml.jpg", 4900, "water"));
    this.items.push(new Item(6, "제주삼다수 생수, 2L, 12개", "./image/jeju.jpg", 12950, "water"));
    this.items.push(new Item(7, "땡큐 물티슈 캡형 100매, 10개", "./image/water_tissue.jpg", 8490, "tissue"));
    this.items.push(new Item(8, "크리넥스 마이비데 비데티슈 리필형, 46매 x 100팩", "./image/my.jpg", 14900, "tissue"));
    this.items.push(new Item(9, "스마트케어 덴탈크리닉 2080 치약, 190g, 5개", "./image/smartcare.jpg", 5500, "oralcare"));
    this.items.push(new Item(10, "리스테린 구강청결제 쿨민트, 750ml, 2개", "./image/listein.jpg", 9430, "oralcare"));
    this.items.push(new Item(11, "클리오 파인올 라운드 미세모 칫솔, 10개입, 1개", "./image/clio.jpg", 4300, "oralcare"));
    this.items.push(new Item(12, "다우니 울트라 에이프릴 프레쉬 섬유유연제 본품, 5.03L, 1개", "./image/downy.jpg", 16290, "detergent"));
    this.items.push(new Item(13, "코디 라벤더 3겹 롤화장지 30m, 30롤, 1개", "./image/codi.jpg", 8700, "tissue"));
    this.items.push(new Item(14, "리큐 진한겔 액상detergent 일반용 리필형, 2.1L, 2개", "./image/liq.jpg", 7290, "detergent"));
    this.items.push(new Item(15, "크리넥스 황사용mask 플러스 대형 KF80, 17개입, 1박스", "./image/mask.jpg", 19900, "mask"));
    this.items.push(new Item(16, "땡큐 물티슈 캡형, 100매, 10개", "./image/thankyou.jpg", 8430, "tissue"));
    this.items.push(new Item(17, "코디 후레시아 황사mask 성인용 KF94, 30개입, 1개", "./image/codi_mask.jpg", 32900, "mask"));
    this.items.push(new Item(18, "다우니 아로마 플로럴 섬유유연제, 8.5L, 1개", "./image/dawni.jpg", 13900, "detergent"));
    this.items.push(new Item(29, "스마트케어 덴탈크리닉 2080 치약, 190g, 10개", "./image/smart_care.jpg", 9400, "oralcare"));

    this.selectedItem = this.items[0];
  }

  ngOnInit() {
  }

  addItem(item) {
    this.cartService.addItem(_.clone(item));
  }

  normalizeCount(count) {
    if (count < 1) {
      return 1;
    }
    if (99 < count) {
      return 99;
    }
    return Math.floor(count);
  }

  itemCountChanged(event) {
    event.target.value = this.normalizeCount(event.target.value);
  }
  priceOrder(){
    this.sort ='price';
  }
  nameOrder(){
    this.sort ='name';
  }

  showDetail(item) {
    this.selectedItem = item;
    this.detailModal.show();
  }

  typeOrder(event){
    if(this.categorizer===event.target.id){
      this.categorizer = ''
      this.userFilter = { name : '', category: this.categorizer };
    }
    else{
      this.categorizer=event.target.id;
      this.userFilter = { name : '', category: this.categorizer };
    }
    console.log(event.target.id);
  }
}
