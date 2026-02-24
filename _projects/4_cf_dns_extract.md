---
layout: page
title: Cloudflare DNS Records Export Tool
description: Enterprise-grade DNS record extraction from Cloudflare with parallel processing and Docker support
img: assets/img/projects/cf-dns-extract.png
importance: 4
category: work
github: https://github.com/mainulhossain123/cf_dns_extract
tags: [Python, Cloudflare API, Docker]
---

## Overview

A production-ready Python tool for extracting all DNS records from Cloudflare zones, filtered by account name, with parallel processing and containerized deployment support. Designed for enterprise cloud operations teams managing multi-tenant Cloudflare infrastructures, this tool provides fast, reliable DNS inventory export for compliance, migration, and audit workflows.

## Key Features

### High-Performance DNS Extraction

- **Parallel Zone Processing**: Uses `ThreadPoolExecutor` (5 workers) for concurrent DNS record fetching
- **Pagination Support**: Handles large Cloudflare accounts with 100 zones per API page
- **Account Filtering**: Scopes extraction to specific Cloudflare account names
- **Comprehensive Record Types**: Exports A, AAAA, CNAME, MX, TXT, and all other DNS record types

### Enterprise-Ready Architecture

- **Retry Logic**: Built-in 3-attempt retry mechanism for API resilience
- **Session Reuse**: HTTP connection pooling via `requests.Session` for efficiency
- **Docker-Compatible**: Default output to `/app` directory for containerized environments
- **Environment-Driven Config**: API keys and settings via environment variables

### Structured CSV Output

- **Timestamped Files**: Automatic filename generation with date stamps
- **Structured Schema**: Zone Name, Hostname, DNS Type, DNS Value columns
- **Customizable Output**: Configurable filename prefix and output directory

## Technology Stack

- **Language**: Python 3.7+
- **HTTP Client**: requests with session pooling
- **Concurrency**: concurrent.futures.ThreadPoolExecutor
- **API**: Cloudflare REST API v4 (/zones, /dns_records)
- **Containerization**: Docker-ready with /app default directory
- **Output Format**: CSV (comma-separated values)

## Architecture

1. **Zone Fetch**: Paginated retrieval of all zones, filtered by account name
2. **Parallel DNS Fetch**: Concurrent DNS record retrieval per zone using thread pool
3. **CSV Export**: Aggregated results written to timestamped CSV file

## Use Cases

- **DNS Migration**: Export complete DNS inventory before cloud provider migrations
- **Compliance Auditing**: Generate DNS record snapshots for SOC2/ISO27001 documentation
- **Disaster Recovery**: Maintain off-platform DNS backups for business continuity
- **Multi-Tenant Management**: Isolate DNS records by Cloudflare account for MSP workflows
- **Infrastructure as Code**: Generate zone file templates from production DNS state

## Configuration

Environment variables:

- **API_KEY**: Cloudflare API token (Zone.Read + DNS.Read permissions required)
- **ACCOUNT_NAME**: Cloudflare account name for zone filtering
- **OUTPUT_FILENAME_PREFIX**: Custom prefix for CSV filename (e.g., `CF_DNS_Export`)
- **OUTPUT_DIR**: Output directory path (default: `/app` for Docker)

## Example Usage

```bash
# Set environment variables
export API_KEY=your_cloudflare_token
export ACCOUNT_NAME="Your Corp Name"
export OUTPUT_FILENAME_PREFIX=CF_DNS_Export

# Run the script
python CF_Zone_DNS_Extraction.py

# Output: CF_DNS_Export.csv in /app directory
```

### Sample CSV Output

| Zone Name   | Hostname         | DNS Type | DNS Value         |
| ----------- | ---------------- | -------- | ----------------- |
| example.com | www.example.com  | A        | 192.0.2.1         |
| example.com | mail.example.com | MX       | mail.provider.com |

## Docker Deployment

```bash
docker run -e API_KEY=$API_KEY -e ACCOUNT_NAME="My Company" \
  -v $(pwd):/app cf-dns-extract:latest
```

## Results & Impact

- **Time Savings**: Parallel processing reduces extraction time for 100+ zones to under 2 minutes
- **Compliance Ready**: Automated DNS snapshots for audit trail requirements
- **Cloud-Native**: Container-first design for seamless CI/CD and Kubernetes integration
- **Scalable**: Handles enterprise accounts with 1000+ zones

---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3">
        <a href="https://github.com/mainulhossain123/cf_dns_extract" class="btn btn-primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
        </a>
    </div>
</div>
