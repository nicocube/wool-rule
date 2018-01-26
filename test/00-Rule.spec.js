/*
 * Copyright 2018 Nicolas Lochet Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

'use strict'

var test = require('tape')
  , Rule = require(__dirname + '/../lib/Rule.js')


test('create rule', async function(t) {
  let s = {}
    , n = Date.now()
    , p = {}
    , rule = new Rule({
      namespace: 'test',
      name: 'rule',
      param: {},
      cond(store, tmstp, param) {
        return new Promise(resolve => {
          setTimeout(() => {
            t.deepEqual(s, store)
            t.deepEqual(n, tmstp)
            t.deepEqual(p, param)
            resolve(true)
          }, 100)
        })
      },
      run() {}
    })

  let actual = await rule.validate(s, n, p)

  t.ok(actual)
  t.plan(4)
  t.end()
})