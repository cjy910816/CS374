import {Component, OnInit} from '@angular/core';
import Any = jasmine.Any;
import {CartService} from "../../../../shared/cart/cart.service";


@Component({
  selector: 'app-item-list',
  templateUrl: 'itemList.component.html',
  styleUrls: ['itemList.component.scss']
})
export class ItemListComponent implements OnInit {
  private items: Object[] = [
    {
      name: "센카 퍼펙트 휍 N 클렌징 폼, 120g 2개",
      img: "./image/perfect_whip.jpg",
      price: 11300
    },
    {
      name: "크리넥스 순수 3겹 소프트 롤화장지 27m, 30롤 1개",
      img: "./image/paper_tissue.jpg",
      price: 13900
    },
    {
      name: "뉴트로지나 딥클린 포밍 클렌저, 175g, 2개",
      img: "./image/deep_clean.jpg",
      price: 14300
    },
    {
      name: "동원샘물, 2L, 6개",
      img: "./image/water_2l.jpg",
      price: 3790
    },
    {
      name: "동원샘물 500ml, 20개",
      img: "./image/water_500ml.jpg",
      price: 4900
    },
    {
      name: "제주삼다수 생수, 2L, 12개",
      img: "./image/jeju.jpg",
      price: 12950
    },
    {
      name: "땡큐 물티슈 캡형 100매, 10개",
      img: "./image/water_tissue.jpg",
      price: 8490
    },
    {
      name: "크리넥스 마이비데 비데티슈 리필형, 46매 x 100팩",
      img: "./image/my.jpg",
      price: 14900
    },
    {
      name: "스마트케어 덴탈크리닉 2080 치약, 190g, 5개",
      img: "./image/smartcare.jpg",
      price: 5500
    },
    {
      name: "리스테린 구강청결제 쿨민트, 750ml, 2개",
      img: "./image/listein.jpg",
      price: 9430
    },
    {
      name: "클리오 파인올 라운드 미세모 칫솔, 10개입, 1개",
      img: "./image/clio.jpg",
      price: 4300
    },
    {
      name: "다우니 울트라 에이프릴 프레쉬 섬유유연제 본품, 5.03L, 1개",
      img: "./image/downy.jpg",
      price: 16290
    }
  ];

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
  }

  addItem(item){
    this.cartService.addItem(item);
  }

}
