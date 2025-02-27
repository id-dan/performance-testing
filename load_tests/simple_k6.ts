import http from 'k6/http'
import { sleep, check } from 'k6'
import { Counter } from 'k6/metrics'

let ErrorCount = new Counter("errors");

export const options = {
    vus: 10,
    duration: '15s',
    thresholds: {
        errors: ['count<10']
    }
}


export default function () {
 const path = Math.random() < 0.9 ? '200' : '500';

//  let res = http.get(`https://test.k6.io/${path}`)
 let res = http.get(`https://test.k6.io/contacts.php`)
 let success = check(res, {
    'status is 200' : r => r.status === 200
 })

 if (!success) ErrorCount.add(1)

 sleep(2)
}
