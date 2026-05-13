import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration(fileName: string) {
  const filePath = path.join(__dirname, 'migrations', fileName)
  const sql = fs.readFileSync(filePath, 'utf-8')
  const { error } = await supabase.rpc('exec_sql', { sql })
  if (error) {
    // 如果 exec_sql 不存在，使用 REST API 直接执行
    console.error(`执行 ${fileName} 失败:`, error)
    process.exit(1)
  }
  console.log(`✅ ${fileName} 执行成功`)
}

async function seed() {
  console.log('开始同步 RTA 资产数据到 Supabase...')
  await runMigration('001_create_rta_tables.sql')
  await runMigration('002_seed_rta_data.sql')
  console.log('🎉 数据同步完成')
}

seed().catch((err) => {
  console.error('Seed 失败:', err)
  process.exit(1)
})
