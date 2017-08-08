/**
 * Created by zhailiang on 2017/7/4.
 */
import * as express from 'express';
import {Server} from 'ws';

const app = express();

app.get('/', (request, response) => response.send('��������ҳ'));

app.get('/api/stock', (request, response) => {
   response.json(stocks);
});

app.get('/api/stock/:id', (request, response) => {
   response.json(stocks.find((stock) => stock.id == request.params.id));
});

const server = app.listen(8080, 'localhost', () => {
   console.log('�������Ѿ���������ַ��http://localhost:8080');
});

const wsServer = new Server({port:8081});
wsServer.on('connection', websocket => {
   websocket.send('��ӭ���ӷ�����.');
   websocket.on('message', message => {
      console.log("���յ��ͻ��˷��͵���Ϣ,��Ϣ������:"+message);
   });
});

setInterval(() => {
   if(wsServer.clients){
      wsServer.clients.forEach(client => {
         client.send("���Ƕ�ʱ���͵���Ϣ");
      })
   }
}, 2000);

export class Stock {
   constructor(public id: number,
               public name: string,
               public price: number,
               public rating: number,
               public desc: string,
               public categories: Array<string>) {

   }
}

const stocks: Stock[] = [
   new Stock(1, "��һֻ��Ʊ", 1.99, 3.5, "���ǵ�һֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["IT", "������"]),
   new Stock(2, "�ڶ�ֻ��Ʊ", 2.99, 4.5, "���ǵڶ�ֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["����"]),
   new Stock(3, "����ֻ��Ʊ", 3.99, 2.5, "���ǵ���ֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["IT"]),
   new Stock(4, "����ֻ��Ʊ", 4.99, 1.5, "���ǵ���ֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["������"]),
   new Stock(5, "����ֻ��Ʊ", 5.99, 2.4, "���ǵ���ֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["����"]),
   new Stock(6, "����ֻ��Ʊ", 6.99, 3.5, "���ǵ���ֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["IT", "������"]),
   new Stock(7, "����ֻ��Ʊ", 7.99, 5.0, "���ǵ���ֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["IT", "����"]),
   new Stock(8, "�ڰ�ֻ��Ʊ", 8.99, 4.5, "���ǵڰ�ֻ��Ʊ,������ѧϰĽ����Angular����ʵսʱ������", ["����", "������"]),
];